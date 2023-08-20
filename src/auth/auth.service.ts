import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(dto: UserDto): Promise<any> {
    const user = await this.userService.getOneByLogin(dto.login);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    }
    return null;
  }

  async generateAccessToken(userId: number, login: string): Promise<string> {
    const payload = { userId, login };
    return this.jwtService.sign(payload);
  }

  async generateAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    try {
      // Verify the refresh token
      const decoded = this.jwtService.verify(refreshToken);
      // Generate a new access token based on the refresh token's payload
      const accessToken = await this.generateAccessToken(
        decoded.userId,
        decoded.login,
      );
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signUp(dto: CreateUserDto) {
    try {
      const user = await this.userService.create(dto);
      console.log(user);
      return { id: user.id };
    } catch (error) {
      throw new BadRequestException('Invalid credentionals');
    }
  }

  async login(dto: UserDto) {
    const user = await this.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id, user.login);

    return { accessToken };
  }

  async refresh(refreshToken: string) {
    try {
      const newAccessToken = await this.generateAccessTokenFromRefreshToken(
        refreshToken,
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

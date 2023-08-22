import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundError } from 'src/common/filters/custom-exception.filter';

const SALT = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class AuthService {
  loggingservice: any;
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(dto: UserDto): Promise<any> {
    const user = await this.getOneByLogin(dto.login);
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
      const user = await this.create(dto);
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

  async getOneByLogin(login: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        login: login,
      },
    });
    if (!user) {
      this.loggingservice.logError(UserNotFoundError.name, 'User not found');
      throw new UserNotFoundError();
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, SALT);

    const data = {
      login: dto.login,
      password: hash,
    };
    const user = await this.prismaService.user.create({ data: data });
    return user;
  }
}

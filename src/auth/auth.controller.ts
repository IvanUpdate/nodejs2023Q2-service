import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
  // POST auth/signup - send login and password to create a new user
  // Server should answer with status code 201 and corresponding message if dto is valid
  // Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)

  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  // POST auth/login - send login and password to get Access token and Refresh token (optionally)
  // Server should answer with status code 200 and tokens if dto is valid
  // Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)
  // Server should answer with status code 403 and corresponding message if authentication failed (no user with such login, password doesn't match actual one, etc.)

  @Post('/refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
  // POST auth/refresh - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token
  // Server should answer with status code 200 and tokens in body if dto is valid
  // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
  // Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)
}

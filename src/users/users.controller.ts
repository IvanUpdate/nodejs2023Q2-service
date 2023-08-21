import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { LoggingService } from 'src/common/logging/logging.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll() {
    this.loggingService.logRequest('/user', 'GET');
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/user/${id}`, 'GET');
    return this.usersService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    this.loggingService.logRequest('/user', 'POST');
    return this.usersService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    this.loggingService.logRequest(`/user/${id}`, 'PUT');
    return this.usersService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/user/${id}`, 'DEL');
    return this.usersService.delete(id);
  }
}

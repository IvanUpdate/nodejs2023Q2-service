import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    this.usersService.create(dto);
    return dto;
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    this.usersService.update(id, dto);
    return 'Password was updated';
  }

  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.usersService.delete(id);
  }
}

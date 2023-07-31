import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    this.usersService.addUser(dto);
    return dto;
  }

  //     GET /user - get all users
  // Server should answer with status code 200 and all users records
  // GET /user/:id - get single user by id
  // Server should answer with status code 200 and and record with id === userId if it exists
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  // POST /user - create user (following DTO should be used) CreateUserDto
  //     interface CreateUserDto {
  //       login: string;
  //       password: string;
  //     }
  // Server should answer with status code 201 and newly created record if request is valid
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields
  // PUT /user/:id - update user's password UpdatePasswordDto (with attributes):
  // interface UpdatePasswordDto {
  //   oldPassword: string; // previous password
  //   newPassword: string; // new password
  // }
  // Server should answer with status code 200 and updated record if request is valid
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  // Server should answer with status code 403 and corresponding message if oldPassword is wrong
  // DELETE /user/:id - delete user
  // Server should answer with status code 204 if the record is found and deleted
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService, User } from 'src/database/database.service';
import { CreateUserDto } from './dto/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update.dto';
import { User_Optimized } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<User[]> {
    const users = await this.databaseService.users;
    if (!users) {
      throw new NotFoundException('There are no users');
    }
    return users.map((user) => {
      return new User_Optimized(user);
    });
  }

  async getOne(id: string): Promise<User_Optimized> {
    const user = await this.databaseService.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new User_Optimized(user);
  }

  create(dto: CreateUserDto): User_Optimized {
    const date = Date.now();
    const user = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.databaseService.users.push(user);
    return new User_Optimized(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<boolean> {
    const index = this.databaseService.users.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (this.databaseService.users[index].password !== dto.oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    this.databaseService.users[index].password = dto.newPassword;
    this.databaseService.users[index].version += 1;
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const index = await this.databaseService.users.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.databaseService.users.splice(index, 1);

    return true;
  }
}

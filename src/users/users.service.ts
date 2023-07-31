import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService, User } from 'src/database/database.service';
import { CreateUserDto } from './dto/create.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    const users = await this.databaseService.users;
    if (!users) {
      throw new NotFoundException('There are no users');
    }
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.databaseService.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addUser(dto: CreateUserDto): Promise<void> {
    const user = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.databaseService.users.push(user);
  }
}

//   async editUser(
//     userId: number,
//     dto: EditUserDto,
//   ) {
//     const user = await this.prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         ...dto,
//       },
//     });

//     delete user.hash;

//     return user;
//   }

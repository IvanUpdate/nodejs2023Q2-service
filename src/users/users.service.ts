import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { formatUser } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => formatUser(user));
  }

  async getOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return formatUser(user);
  }

  async create(dto: CreateUserDto) {
    const user = await this.prismaService.user.create({ data: dto });
    return formatUser(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
    });
    return formatUser(updateUser);
  }

  async delete(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}

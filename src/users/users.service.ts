import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { formatUser } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoggingService } from 'src/common/logging/logging.service';
import {
  UserNotFoundError,
  WrongPasswordError,
} from 'src/common/filters/custom-exception.filter';

const SALT = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly loggingservice: LoggingService,
  ) {}

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
      this.loggingservice.logError(UserNotFoundError.name, 'User not found');
      throw new UserNotFoundError();
    }
    return formatUser(user);
  }

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, SALT);
    console.log('making new password', hash);

    const data = {
      login: dto.login,
      password: hash,
    };
    const user = await this.prismaService.user.create({ data: data });
    return formatUser(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      this.loggingservice.logError(UserNotFoundError.name, 'User not found');
      throw new UserNotFoundError();
    }

    const isValidPassword = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );

    if (!isValidPassword) {
      this.loggingservice.logError(WrongPasswordError.name, 'Wrong password');
      throw new WrongPasswordError();
    }

    const update_hash = await bcrypt.hash(dto.newPassword, SALT);

    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: update_hash,
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
      this.loggingservice.logError(UserNotFoundError.name, 'User not found');
      throw new UserNotFoundError();
    }
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
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
}

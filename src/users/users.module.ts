import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}

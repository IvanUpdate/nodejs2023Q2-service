import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggingModule } from 'src/common/logging/logging.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, PrismaModule, LoggingModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UserModule {}

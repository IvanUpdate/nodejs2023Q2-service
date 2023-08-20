import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggingModule } from 'src/common/logging/logging.module';

@Module({
  imports: [DatabaseModule, PrismaModule, LoggingModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}

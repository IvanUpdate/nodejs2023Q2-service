import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [FavoritesModule, AuthModule],
  providers: [AlbumsService, JwtService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}

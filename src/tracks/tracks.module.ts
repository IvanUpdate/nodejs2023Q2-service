import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [FavoritesService, FavoritesModule, AuthModule],
  controllers: [TracksController],
  providers: [TracksService, JwtService],
  exports: [TracksService, FavoritesService],
})
export class TracksModule {}

import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [FavoritesService, FavoritesModule, AuthModule],
  providers: [ArtistsService, JwtService],
  controllers: [ArtistsController],
  exports: [ArtistsService, FavoritesService],
})
export class ArtistsModule {}

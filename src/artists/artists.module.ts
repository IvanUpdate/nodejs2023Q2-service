import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FavoritesService, FavoritesModule],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService, FavoritesService],
})
export class ArtistsModule {}

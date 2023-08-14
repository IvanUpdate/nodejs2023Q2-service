import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FavoritesService, FavoritesModule],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService, FavoritesService],
})
export class AlbumsModule {}

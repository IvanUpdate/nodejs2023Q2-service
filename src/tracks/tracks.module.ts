import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FavoritesService, FavoritesModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService, FavoritesService],
})
export class TracksModule {}

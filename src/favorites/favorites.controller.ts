import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoriteService.getAll();
  }

  @Post('/track/:id')
  add_track(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Post('/album/:id')
  add_album(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  add_artist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('/track/:id')
  delete_track(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('/album/:id')
  delete_album(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('/artist/:id')
  delete_artist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.deleteArtist(id);
  }
}

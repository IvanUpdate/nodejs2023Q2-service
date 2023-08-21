import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { LoggingService } from 'src/common/logging/logging.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private favoriteService: FavoritesService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll() {
    this.loggingService.logRequest('/favs', 'GET');
    return this.favoriteService.getAll();
  }

  @Post('/track/:id')
  add_track(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'POST');
    return this.favoriteService.addTrack(id);
  }

  @Post('/album/:id')
  add_album(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'POST');
    return this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  add_artist(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'POST');
    return this.favoriteService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  delete_track(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'DEL');
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  delete_album(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'DEL');
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  delete_artist(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/favs/${id}`, 'DEL');
    return this.favoriteService.deleteArtist(id);
  }
}

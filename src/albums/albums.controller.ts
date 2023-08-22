import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { LoggingService } from 'src/common/logging/logging.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll() {
    this.loggingService.logRequest('/album', 'GET');
    return this.albumsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/album/${id}`, 'GET');
    return this.albumsService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateAlbumDto) {
    this.loggingService.logRequest('/album', 'POST');
    return this.albumsService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlbumDto) {
    this.loggingService.logRequest(`/album/${id}`, 'PUT');
    return this.albumsService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/album/${id}`, 'DEL');
    return this.albumsService.delete(id);
  }
}

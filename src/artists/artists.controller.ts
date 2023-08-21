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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { LoggingService } from 'src/common/logging/logging.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll() {
    this.loggingService.logRequest('/artist', 'GET');
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/artist/${id}`, 'GET');
    return this.artistsService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateArtistDto) {
    this.loggingService.logRequest('artist', 'POST');
    return this.artistsService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArtistDto) {
    this.loggingService.logRequest(`/artist/${id}`, 'PUT');
    return this.artistsService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/artist/${id}`, 'DEL');
    return this.artistsService.delete(id);
  }
}

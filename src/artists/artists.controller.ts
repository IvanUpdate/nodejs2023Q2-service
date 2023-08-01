import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArtistDto) {
    return this.artistsService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.delete(id);
  }
}

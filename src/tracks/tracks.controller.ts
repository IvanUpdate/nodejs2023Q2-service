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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { LoggingService } from 'src/common/logging/logging.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(
    private tracksService: TracksService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll() {
    this.loggingService.logRequest('/track', 'GET');
    return this.tracksService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/track/${id}`, 'GET');
    return this.tracksService.getOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateTrackDto) {
    this.loggingService.logRequest('/track', 'POST');
    return this.tracksService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrackDto) {
    this.loggingService.logRequest(`/track/${id}`, 'PUT');
    return this.tracksService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.loggingService.logRequest(`/track/${id}`, 'DEL');
    return this.tracksService.delete(id);
  }
}

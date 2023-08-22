import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatArtist } from './dto/update.dto';
import { LoggingService } from 'src/common/logging/logging.service';
import { ArtistNotFoundError } from 'src/common/filters/custom-exception.filter';

@Injectable()
export class ArtistsService {
  constructor(
    private prismaService: PrismaService,
    private readonly loggingservice: LoggingService,
  ) {}

  async getAll() {
    return this.prismaService.artist.findMany();
  }

  async getOne(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) {
      this.loggingservice.logError(
        ArtistNotFoundError.name,
        'Artist not found',
      );
      throw new ArtistNotFoundError();
    }
    return formatArtist(artist);
  }

  async create(dto: CreateArtistDto) {
    const artist = await this.prismaService.artist.create({ data: dto });
    return formatArtist(artist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    try {
      const artist = await this.prismaService.artist.update({
        where: { id },
        data: dto,
      });
      return formatArtist(artist);
    } catch (e) {
      this.loggingservice.logError(
        ArtistNotFoundError.name,
        'Artist not found',
      );
      throw new ArtistNotFoundError();
    }
  }

  async delete(id: string) {
    try {
      await this.prismaService.artist.delete({ where: { id } });
      await this.prismaService.album.updateMany({
        where: { artistId: id },
        data: {
          artistId: null,
        },
      });
      await this.prismaService.track.updateMany({
        where: { artistId: id },
        data: {
          artistId: null,
        },
      });
      return true;
    } catch (e) {
      this.loggingservice.logError(
        ArtistNotFoundError.name,
        'Artist not found',
      );
      throw new ArtistNotFoundError();
    }
  }
}

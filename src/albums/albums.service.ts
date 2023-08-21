import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingService } from 'src/common/logging/logging.service';
import { AlbumNotFoundError } from 'src/common/filters/custom-exception.filter';

@Injectable()
export class AlbumsService {
  constructor(
    private prismaService: PrismaService,
    private readonly loggingservice: LoggingService,
  ) {}

  async getAll() {
    return this.prismaService.album.findMany();
  }

  async getOne(id: string) {
    const album = await this.prismaService.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) {
      this.loggingservice.logError(AlbumNotFoundError.name, 'Album not found');
      throw new AlbumNotFoundError();
    }
    return album;
  }

  async create(dto: CreateAlbumDto) {
    const album = await this.prismaService.album.create({ data: dto });
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    try {
      const album = await this.prismaService.album.update({
        where: { id },
        data: dto,
      });
      return album;
    } catch (e) {
      this.loggingservice.logError(AlbumNotFoundError.name, 'Album not found');
      throw new AlbumNotFoundError();
    }
  }

  async delete(id: string) {
    try {
      await this.prismaService.album.delete({ where: { id } });
      await this.prismaService.track.updateMany({
        where: { albumId: id },
        data: {
          albumId: null,
        },
      });
      return true;
    } catch (e) {
      this.loggingservice.logError(AlbumNotFoundError.name, 'Album not found');
      throw new AlbumNotFoundError();
    }
  }
}

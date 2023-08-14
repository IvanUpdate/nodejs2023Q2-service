import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

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
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(dto: CreateAlbumDto) {
    const album = await this.prismaService.album.create({ data: dto });
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.prismaService.album.update({
      where: { id },
      data: dto,
    });

    if (!album) {
      throw new NotFoundException('Albums not found');
    }
    return album;
  }

  async delete(id: string): Promise<boolean> {
    const index = await this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Albums not found');
    }

    this.databaseService.albums.splice(index, 1);

    const index_favorites =
      await this.databaseService.favorites.albums.findIndex(
        (album) => album.id === id,
      );

    if (index_favorites !== -1) {
      this.favoriteService.deleteAlbum(id);
    }

    this.databaseService.tracks = this.databaseService.tracks.map((track) => {
      if (track.albumId === id) {
        return {
          ...track,
          albumId: null,
        };
      } else {
        return track;
      }
    });

    return true;
  }
}

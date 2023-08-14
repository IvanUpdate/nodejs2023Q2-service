import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
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
    try {
      const album = await this.prismaService.album.update({
        where: { id },
        data: dto,
      });
      return album;
    } catch (e) {
      throw new NotFoundException('Album not found');
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
      throw new NotFoundException('Album not found');
    }
  }
}

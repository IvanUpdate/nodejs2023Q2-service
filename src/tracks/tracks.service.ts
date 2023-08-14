import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.track.findMany();
  }

  async getOne(id: string) {
    const track = await this.prismaService.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async create(dto: CreateTrackDto) {
    const track = await this.prismaService.track.create({ data: dto });
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    try {
      const track = await this.prismaService.track.update({
        where: { id },
        data: dto,
      });
      return track;
    } catch (e) {
      throw new NotFoundException('Track not found');
    }
  }

  async delete(id: string) {
    try {
      await this.prismaService.track.delete({ where: { id } });
      return true;
    } catch (e) {
      throw new NotFoundException('Track not found');
    }
  }
}

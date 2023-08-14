import {
  Global,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatData } from './utils/format';

@Global()
@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    const tracks = await this.prismaService.track.findMany({
      where: { isFavourite: true },
    });
    const albums = await this.prismaService.album.findMany({
      where: { isFavourite: true },
    });
    const artists = await this.prismaService.artist.findMany({
      where: { isFavourite: true },
    });
    return {
      tracks: tracks.map((track) => formatData(track)),
      albums: albums.map((album) => formatData(album)),
      artists: artists.map((artist) => formatData(artist)),
    };
  }

  async addTrack(id: string) {
    try {
      const track = await this.prismaService.track.update({
        where: { id },
        data: {
          isFavourite: true,
        },
      });
      return track;
    } catch (e) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.prismaService.album.update({
        where: { id },
        data: {
          isFavourite: true,
        },
      });
      return album;
    } catch (e) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.prismaService.artist.update({
        where: { id },
        data: {
          isFavourite: true,
        },
      });
      return artist;
    } catch (e) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async deleteTrack(id: string) {
    try {
      const track = await this.prismaService.track.update({
        where: { id },
        data: {
          isFavourite: false,
        },
      });
      return track;
    } catch (e) {
      throw new NotFoundException('Track not found');
    }
  }

  async deleteAlbum(id: string) {
    try {
      const album = await this.prismaService.album.update({
        where: { id },
        data: {
          isFavourite: false,
        },
      });
      return album;
    } catch (e) {
      throw new NotFoundException('Album not found');
    }
  }

  async deleteArtist(id: string) {
    try {
      const artist = await this.prismaService.artist.update({
        where: { id },
        data: {
          isFavourite: false,
        },
      });
      return artist;
    } catch (e) {
      throw new NotFoundException('Artist not found');
    }
  }

  

}

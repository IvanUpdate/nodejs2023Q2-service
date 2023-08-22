import { Global, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatData } from './utils/format';
import { LoggingService } from 'src/common/logging/logging.service';
import {
  AlbumNotFoundError,
  ArtistNotFoundError,
  ItemNotFoundError,
  TrackNotFoundError,
} from 'src/common/filters/custom-exception.filter';

@Global()
@Injectable()
export class FavoritesService {
  constructor(
    private prismaService: PrismaService,
    private readonly loggingservice: LoggingService,
  ) {}

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
      if (!track) {
        throw new ItemNotFoundError();
      }
      return track;
    } catch (e) {
      this.loggingservice.logError(ItemNotFoundError.name, 'Track not found');
      throw new ItemNotFoundError();
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
      this.loggingservice.logError(ItemNotFoundError.name, 'Album not found');
      throw new ItemNotFoundError();
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
      this.loggingservice.logError(ItemNotFoundError.name, 'Artist not found');
      throw new ItemNotFoundError();
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
      this.loggingservice.logError(TrackNotFoundError.name, 'Track not found');
      throw new TrackNotFoundError();
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
      this.loggingservice.logError(AlbumNotFoundError.name, 'Album not found');
      throw new AlbumNotFoundError();
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
      this.loggingservice.logError(
        ArtistNotFoundError.name,
        'Artist not found',
      );
      throw new ArtistNotFoundError();
    }
  }
}

import { Global, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import {
  Album,
  Artist,
  DatabaseService,
  Favorites,
  Track,
} from 'src/database/database.service';

@Global()
@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<Favorites> {
    const favorites = await this.databaseService.favorites;
    if (!favorites) {
      throw new NotFoundException('There are no albums');
    }
    return favorites;
  }

  async addTrack(id: string): Promise<Track | undefined> {
    const index = await this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );
    if (index === -1) {
      throw new UnprocessableEntityException('Track not found');
    }

    const track = await this.databaseService.tracks[index];
    const index_check = await this.databaseService.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (index_check > 0) {
      return track;
    }
    this.databaseService.favorites.tracks.push(track);
    return track;
  }

  async addAlbum(id: string): Promise<Album | undefined> {
    const index = await this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );
    if (index === -1) {
      throw new UnprocessableEntityException('Album not found');
    }
    const album = await this.databaseService.albums[index];
    const index_check = await this.databaseService.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (index_check > 0) {
      return album;
    }
    this.databaseService.favorites.albums.push(album);
    return album;
  }

  async addArtist(id: string): Promise<Artist | undefined> {
    const index = await this.databaseService.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const artist = await this.databaseService.artists[index];
    const index_check = await this.databaseService.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index_check > 0) {
      return artist;
    }
    this.databaseService.favorites.artists.push(artist);
    return artist;
  }

  deleteTrack(id: string): boolean {
    const index = this.databaseService.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.databaseService.favorites.tracks.splice(index, 1);

    return true;
  }

  deleteAlbum(id: string): boolean {
    const index = this.databaseService.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.databaseService.favorites.albums.splice(index, 1);

    return true;
  }

  deleteArtist(id: string): boolean {
    const index = this.databaseService.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.databaseService.favorites.artists.splice(index, 1);

    return true;
  }
}

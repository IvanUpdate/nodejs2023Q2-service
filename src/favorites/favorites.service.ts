import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Album,
  Artist,
  DatabaseService,
  Favorites,
  Track,
} from 'src/database/database.service';

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
      throw new NotFoundException('Track not found');
    }
    const track = await this.databaseService.tracks[index];
    this.databaseService.favorites.tracks.push(track);
    return track;
  }

  async addAlbum(id: string): Promise<Album | undefined> {
    const index = await this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    const album = await this.databaseService.albums[index];
    this.databaseService.favorites.albums.push(album);
    return album;
  }

  async addArtist(id: string): Promise<Artist | undefined> {
    const index = await this.databaseService.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    const artist = await this.databaseService.artists[index];
    this.databaseService.favorites.artists.push(artist);
    return artist;
  }

  async deleteTrack(id: string): Promise<boolean> {
    const index = await this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.databaseService.tracks.splice(index, 1);

    return true;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const index = await this.databaseService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.databaseService.albums.splice(index, 1);

    return true;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const index = await this.databaseService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.databaseService.artists.splice(index, 1);

    return true;
  }
}

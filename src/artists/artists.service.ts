import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist, DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  constructor(
    private databaseService: DatabaseService,
    private favoriteService: FavoritesService,
  ) {}

  async getAll(): Promise<Artist[]> {
    const artists = await this.databaseService.artists;
    if (!artists) {
      throw new NotFoundException('There are no artists');
    }
    return artists;
  }

  async getOne(id: string): Promise<Artist> {
    const artist = await this.databaseService.artists.find((u) => u.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    await this.databaseService.artists.push(artist);
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist | undefined> {
    const index = await this.databaseService.artists.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...this.databaseService.artists[index],
      ...dto,
    };
    this.databaseService.artists[index] = updatedArtist;
    return updatedArtist;
  }

  async delete(id: string): Promise<boolean> {
    const index = await this.databaseService.artists.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.databaseService.artists.splice(index, 1);

    const index_favorites =
      await this.databaseService.favorites.artists.findIndex(
        (artist) => artist.id === id,
      );

    if (index_favorites !== -1) {
      this.favoriteService.deleteArtist(id);
    }

    this.databaseService.tracks = this.databaseService.tracks.map((track) => {
      if (track.artistId === id) {
        return {
          ...track,
          artistId: null,
        };
      } else {
        return track;
      }
    });

    this.databaseService.albums = this.databaseService.albums.map((album) => {
      if (album.artistId === id) {
        return {
          ...album,
          artistId: null,
        };
      } else {
        return album;
      }
    });

    return true;
  }
}

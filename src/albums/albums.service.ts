import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private databaseService: DatabaseService,
    private favoriteService: FavoritesService,
  ) {}

  async getAll(): Promise<Album[]> {
    const albums = await this.databaseService.albums;
    if (!albums) {
      throw new NotFoundException('There are no albums');
    }
    return albums;
  }

  async getOne(id: string): Promise<Album> {
    const album = await this.databaseService.albums.find((u) => u.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(dto: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: null,
      ...dto,
    };
    this.databaseService.albums.push(album);
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album | undefined> {
    const index = await this.databaseService.albums.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Albums not found');
    }

    const updatedAlbum = {
      ...this.databaseService.albums[index],
      ...dto,
    };
    this.databaseService.albums[index] = updatedAlbum;
    return updatedAlbum;
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

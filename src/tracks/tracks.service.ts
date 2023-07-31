import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService, Track } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update.dto';

@Injectable()
export class TracksService {
  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<Track[]> {
    const tracks = await this.databaseService.tracks;
    if (!tracks) {
      throw new NotFoundException('There are no tracks');
    }
    return tracks;
  }

  async getOne(id: string): Promise<Track> {
    const track = await this.databaseService.tracks.find((u) => u.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...dto,
    };
    await this.databaseService.tracks.push(track);
    return track;
  }

  async updateTrack(
    id: string,
    dto: UpdateTrackDto,
  ): Promise<Track | undefined> {
    const index = await this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = {
      ...this.databaseService.tracks[index],
      ...dto,
    };
    this.databaseService.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  async delete(id: string): Promise<boolean> {
    const index = await this.databaseService.tracks.findIndex(
      (track) => track.id === id,
    );
    console.log(index);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.databaseService.tracks.splice(index, 1);

    return true;
  }
}

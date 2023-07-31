import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

@Injectable()
export class DatabaseService {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

//   create(user: User): User {
//     this.users.push(user);
//     return user;
//   }

//   getUsers(): User[] {
//     const users = this.users;
//     if (!users) {
//       throw new NotFoundException('There are no users');
//     }
//     return users;
//   }

//   getById(id: string): User {
//     const user = this.users.find((u) => u.id === id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     return user;
//   }

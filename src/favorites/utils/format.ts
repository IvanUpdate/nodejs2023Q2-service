//import { Album, Artist, Track } from '@prisma/client';

import { Album } from 'src/albums/dto/album.dto';
import { Artist } from 'src/artists/dto/artist.dto';
import { Track } from 'src/tracks/dto/track.dto';

type Collection = Artist | Album | Track;

export function formatData(collection: Collection) {
  delete collection.isFavourite;
  return collection;
}

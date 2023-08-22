//import { Artist } from '@prisma/client';
import { Artist } from './artist.dto';
import { CreateArtistDto } from './create.dto';

export class UpdateArtistDto extends CreateArtistDto {}

export function formatArtist(artist: Artist) {
  delete artist.isFavourite;
  return artist;
}

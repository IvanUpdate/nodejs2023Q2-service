import { Album, Artist, Track } from '@prisma/client';

type Collection = Artist | Album | Track;

export function formatData(collection: Collection) {
  delete collection.isFavourite;
  return collection;
}

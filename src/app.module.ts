import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritiesService } from './favorities/favorities.service';
import { FavoritiesController } from './favorities/favorities.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
  ],
  controllers: [AppController, FavoritiesController],
  providers: [AppService, FavoritiesService],
})
export class AppModule {}

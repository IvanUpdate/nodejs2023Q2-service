import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Module({
  providers: [AlbumsService]
})
export class AlbumsModule {}

import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService],
  controllers: [AbortController],
  exports: [ArtistsService],
})
export class ArtistsModule {}

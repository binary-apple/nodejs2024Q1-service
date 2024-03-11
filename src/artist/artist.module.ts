import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStore } from './artist_store/artist_store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore],
})
export class ArtistModule {}

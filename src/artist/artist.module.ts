import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStore } from './artist_store/artist_store';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore],
  imports: [AlbumModule, TrackModule],
})
export class ArtistModule {}

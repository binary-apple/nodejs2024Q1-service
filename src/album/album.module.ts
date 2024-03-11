import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStore } from './album_store/album_store';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStore],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}

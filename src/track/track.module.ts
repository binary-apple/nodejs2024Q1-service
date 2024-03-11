import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackStore } from './track_store/track_store';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackStore],
})
export class TrackModule {}

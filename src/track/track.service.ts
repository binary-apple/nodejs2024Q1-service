import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './track_store/track_store';

@Injectable()
export class TrackService {
  constructor(private readonly trackStore: TrackStore) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackStore.create(createTrackDto);
  }

  findAll() {
    return this.trackStore.findAll();
  }

  findOne(id: string) {
    return this.trackStore.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackStore.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.trackStore.remove(id);
  }
}

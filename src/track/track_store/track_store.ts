import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

export class TrackStore {
  private store: { [id: string]: Track } = {};

  create(createTrackDto: CreateTrackDto): Track | undefined {
    const newTrack: Track = new Track({
      id: randomUUID(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
    this.store[newTrack.id] = newTrack;
    return newTrack;
  }

  findAll(): Track[] {
    return Object.values(this.store);
  }

  findOne(id: string): Track | undefined {
    return this.store[id];
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | undefined {
    const item = this.findOne(id);
    if (!item) {
      return;
    }
    const newTrack: Track = new Track({
      ...item,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    });
    this.store[id] = newTrack;
    return newTrack;
  }

  remove(id: string): boolean {
    if (this.store[id]) {
      delete this.store[id];
      return true;
    }
    return false;
  }
}

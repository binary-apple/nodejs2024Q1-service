import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.tracksRepository.create(
      new Track({
        id: randomUUID(),
        name: createTrackDto.name,
        artistId: createTrackDto.artistId,
        albumId: createTrackDto.albumId,
        duration: createTrackDto.duration,
      }),
    );

    return await this.tracksRepository.save(createdTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    return await this.tracksRepository.save(
      new Track({
        ...track,
        name: updateTrackDto.name,
        artistId: updateTrackDto.artistId,
        albumId: updateTrackDto.albumId,
        duration: updateTrackDto.duration,
      }),
    );
  }

  async remove(id: string) {
    await this.tracksRepository.remove(await this.findOne(id));
  }

  async setIsFavorite(id: string, isFavorite: boolean) {
    const artist = await this.findOne(id);

    return await this.tracksRepository.save(
      new Track({
        ...artist,
        isFavorite: isFavorite,
      }),
    );
  }

  async findFavorites() {
    return await this.tracksRepository.find({
      where: { isFavorite: true },
    });
  }
}

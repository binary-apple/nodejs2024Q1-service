import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    private readonly trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = this.albumsRepository.create(
      new Album({
        id: randomUUID(),
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId,
      }),
    );

    return await this.albumsRepository.save(createdAlbum);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    return await this.albumsRepository.save(
      new Album({
        ...album,
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      }),
    );
  }

  async remove(id: string) {
    // remove all albumId from tracks
    this.trackService
      .findAll()
      .filter((track) => track.albumId === id)
      .forEach((track) => {
        this.trackService.update(track.id, {
          ...track,
          albumId: null,
        });
      });
    await this.albumsRepository.remove(await this.findOne(id));
  }
}

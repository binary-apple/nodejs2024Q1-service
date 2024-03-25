import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistsRepository.create(
      new Artist({
        id: randomUUID(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      }),
    );

    return await this.artistsRepository.save(createdArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    return await this.artistsRepository.save(
      new Artist({
        ...artist,
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      }),
    );
  }

  async remove(id: string) {
    // remove all artistId from albums
    (await this.albumService.findAll())
      .filter((album) => album.artistId === id)
      .forEach((album) => {
        this.albumService.update(album.id, {
          ...album,
          artistId: null,
        });
      });
    // remove all artistId from tracks
    (await this.trackService.findAll())
      .filter((track) => track.artistId === id)
      .forEach((track) => {
        this.trackService.update(track.id, {
          ...track,
          artistId: null,
        });
      });

    await this.artistsRepository.remove(await this.findOne(id));
  }

  async setIsFavorite(id: string, isFavorite: boolean) {
    const artist = await this.findOne(id);

    return await this.artistsRepository.save(
      new Artist({
        ...artist,
        isFavorite: isFavorite,
      }),
    );
  }

  async findFavorites() {
    return await this.artistsRepository.find({
      where: { isFavorite: true },
    });
  }
}

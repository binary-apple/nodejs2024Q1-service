import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    return {
      artists: await this.artistService.findFavorites(),
      albums: await this.albumService.findFavorites(),
      tracks: await this.trackService.findFavorites(),
    };
  }

  async createFavAlbum(id: string) {
    try {
      await this.albumService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(`Album with id doesn't exist.`);
    }
    await this.albumService.setIsFavorite(id, true);
  }

  async removeFavAlbum(id: string) {
    await this.albumService.setIsFavorite(id, false);
  }

  async createFavArtist(id: string) {
    try {
      await this.artistService.findOne(id);
    } catch (err) {
      throw new UnprocessableEntityException(`Artist with id doesn't exist.`);
    }
    await this.artistService.setIsFavorite(id, true);
  }

  async removeFavArtist(id: string) {
    await this.artistService.setIsFavorite(id, false);
  }

  async createFavTrack(id: string) {
    try {
      await this.trackService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(`Track with id doesn't exist.`);
    }
    await this.trackService.setIsFavorite(id, true);
  }

  async removeFavTrack(id: string) {
    await this.trackService.setIsFavorite(id, false);
  }
}

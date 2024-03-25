import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavStore } from './favs-store/favs-store';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly favsStore: FavStore,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const allFavs = this.favsStore.findAll();
    return {
      artists: allFavs.artists
        .map(async (id) => await this.artistService.findOne(id))
        .filter((item) => !!item),
      albums: allFavs.albums
        .map(async (id) => await this.albumService.findOne(id))
        .filter((item) => !!item),
      tracks: allFavs.tracks
        .map(async (id) => await this.trackService.findOne(id))
        .filter((item) => !!item),
    };
  }

  async createFavAlbum(id: string) {
    try {
      await this.albumService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(`Album with id doesn't exist.`);
    }
    return this.favsStore.createAlbum(id);
  }

  removeFavAlbum(id: string) {
    return this.favsStore.removeAlbum(id);
  }

  async createFavArtist(id: string) {
    try {
      await this.artistService.findOne(id);
    } catch (err) {
      throw new UnprocessableEntityException(`Artist with id doesn't exist.`);
    }
    return this.favsStore.createArtist(id);
  }

  removeFavArtist(id: string) {
    return this.favsStore.removeArtist(id);
  }

  async createFavTrack(id: string) {
    try {
      await this.trackService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(`Track with id doesn't exist.`);
    }
    return this.favsStore.createTrack(id);
  }

  removeFavTrack(id: string) {
    return this.favsStore.removeTrack(id);
  }
}

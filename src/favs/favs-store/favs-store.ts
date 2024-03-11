import { Fav } from '../entities/fav.entity';

export class FavStore {
  private favAlbumStore: string[] = [];
  private favArtistStore: string[] = [];
  private favTrackStore: string[] = [];

  findAll(): Fav {
    return {
      artists: this.favArtistStore,
      albums: this.favAlbumStore,
      tracks: this.favTrackStore,
    };
  }

  createAlbum(id: string): void {
    this.favAlbumStore.push(id);
  }

  removeAlbum(id: string): boolean {
    if (this.favAlbumStore.find((albumId) => albumId === id)) {
      this.favAlbumStore = this.favAlbumStore.filter(
        (albumId) => albumId !== id,
      );
      return true;
    }
    return false;
  }

  createArtist(id: string): void {
    this.favArtistStore.push(id);
  }

  removeArtist(id: string): boolean {
    if (this.favArtistStore.find((artistId) => artistId === id)) {
      this.favArtistStore = this.favArtistStore.filter(
        (artistId) => artistId !== id,
      );
      return true;
    }
    return false;
  }

  createTrack(id: string): void {
    this.favTrackStore.push(id);
  }

  removeTrack(id: string): boolean {
    if (this.favTrackStore.find((trackId) => trackId === id)) {
      this.favTrackStore = this.favTrackStore.filter(
        (trackId) => trackId !== id,
      );
      return true;
    }
    return false;
  }
}

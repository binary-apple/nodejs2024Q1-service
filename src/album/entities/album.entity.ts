export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(source: Partial<Album>) {
    Object.assign(this, source);
  }
}

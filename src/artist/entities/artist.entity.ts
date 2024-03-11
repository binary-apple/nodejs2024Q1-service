export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(source: Partial<Artist>) {
    Object.assign(this, source);
  }
}

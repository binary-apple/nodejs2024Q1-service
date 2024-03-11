import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStore } from './album_store/album_store';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStore],
})
export class AlbumModule {}

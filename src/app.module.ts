import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
import { DbDataSource } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(DbDataSource as TypeOrmModuleOptions),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

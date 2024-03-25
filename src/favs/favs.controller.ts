import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('/album/:id')
  async createAlbum(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.createFavAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.removeFavAlbum(id);
  }

  @Post('/artist/:id')
  async createArtist(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.createFavArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.removeFavArtist(id);
  }

  @Post('/track/:id')
  async createTrack(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.createFavTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string) {
    if (
      !id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    await this.favsService.removeFavTrack(id);
  }
}

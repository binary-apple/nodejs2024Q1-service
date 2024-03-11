import { PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

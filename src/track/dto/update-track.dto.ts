import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsOptional,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  duration: number;
}

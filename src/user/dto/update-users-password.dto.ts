import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUsersPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

// export class CreateTrackDto {
//   @IsDefined()
//   @IsNotEmpty()
//   name: string;

//   @IsDefined()
//   @IsNotEmpty()
//   @IsInt()
//   duration: number;

//   @IsOptional()
//   @IsUUID()
//   artistId?: string | null;

//   @IsOptional()
//   @IsUUID()
//   albumId?: string | null;
// }
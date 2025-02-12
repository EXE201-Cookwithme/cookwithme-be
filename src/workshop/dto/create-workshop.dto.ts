import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkshopDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  hostName: string;

  @ApiProperty({ required: true })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  link: string;
}

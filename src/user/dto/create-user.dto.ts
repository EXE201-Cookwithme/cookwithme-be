import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  clerkid: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  image: string;
}

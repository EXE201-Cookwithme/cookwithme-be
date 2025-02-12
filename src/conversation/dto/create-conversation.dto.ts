import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  prompt: string;
 
  @ApiProperty()
  @IsString()
  summary: string;
}

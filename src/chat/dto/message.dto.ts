import { IsEnum, IsString } from 'class-validator';
import { RoleChat } from 'src/constants';

export class MessageDto {
  @IsEnum(RoleChat)
  role: string;

  @IsString()
  content: string;
}

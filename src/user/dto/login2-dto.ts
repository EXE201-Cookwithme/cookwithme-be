import { ApiProperty } from '@nestjs/swagger';

export class Login2Dto {
  @ApiProperty()
  accessToken: string;
}

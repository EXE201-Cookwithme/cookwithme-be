import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello() {
    const apiKey = this.configService.get<string>('SUPER_KEY');
    return {
      message: apiKey,
    };
  }
}

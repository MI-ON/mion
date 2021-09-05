import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHeathCheck(): string {
    return 'OK';
  }
}

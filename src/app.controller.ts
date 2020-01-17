import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  public constructor() {}

  @Get('ping')
  public ping(): string {
    return 'pong';
  }
}

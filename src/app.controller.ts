import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
 // @Render('./views/index.hbs')
  root(): string {
    return this.appService.root();
  }
}

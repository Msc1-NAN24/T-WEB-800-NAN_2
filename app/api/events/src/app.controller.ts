import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';

type EventQuery = {
  cityName: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @Get()
  public getEvent(@Query() query: EventQuery) {
    return this.appService.getEvent(query.cityName);
  }
}

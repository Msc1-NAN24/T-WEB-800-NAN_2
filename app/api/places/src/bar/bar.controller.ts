import {Controller, Get, Query} from '@nestjs/common';
import {RestaurantSearchQueryDto} from "../restaurant/restaurant.dto";
import {BarService} from "./bar.service";

@Controller('bar')
export class BarController {

  constructor(private service: BarService) {}

  @Get('search')
  public search(@Query() body: RestaurantSearchQueryDto) {
    console.log('BAR');
    return this.service.getNearby(body);
  }

}

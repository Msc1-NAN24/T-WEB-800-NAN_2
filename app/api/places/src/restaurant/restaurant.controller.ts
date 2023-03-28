import {Controller, Get, Query} from '@nestjs/common';
import {RestaurantSearchQueryDto} from "./restaurant.dto";
import {RestaurantService} from "./restaurant.service";

@Controller('restaurant')
export class RestaurantController {

  constructor(private service: RestaurantService) {}

  @Get('search')
  public search(@Query() body: RestaurantSearchQueryDto) {
    console.log('RESTAURANT');
    return this.service.getNearby(body);
  }

}

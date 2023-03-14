import {Body, Controller, Get} from '@nestjs/common';
import {RestaurantSearchQueryDto} from "./restaurant.dto";
import {RestaurantService} from "./restaurant.service";

@Controller('restaurant')
export class RestaurantController {

  constructor(private service: RestaurantService) {}

  @Get('search')
  public search(@Body() body: RestaurantSearchQueryDto) {
    return this.service.getNearby(body);
  }

}

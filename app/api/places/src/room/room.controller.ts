import {Controller, Get, Query} from '@nestjs/common';
import {RoomService} from "./room.service";
import {RestaurantSearchQueryDto} from "../restaurant/restaurant.dto";

@Controller('room')
export class RoomController {

  constructor(private service: RoomService) {}

  @Get('search')
  public search(@Query() body: RestaurantSearchQueryDto) {
    console.log('HOSTEL');
    return this.service.getNearby(body);
  }

}

import {Controller, Get, Query} from "@nestjs/common";
import {AppService, DetailQueryDto, DistanceQueryDto, EventPlaceQueryDto, PhotoQueryDto} from "./app.service";

@Controller()
export class AppController {

  constructor(private service: AppService) {
  }

  @Get('event')
  public getEvent(@Query() query: EventPlaceQueryDto) {
    return this.service.getEvent(query);
  }

  @Get('detail')
  public getDetails(@Query() query: DetailQueryDto) {
    return this.service.getDetail(query);
  }

  @Get('photo')
  public getPhoto(@Query() photo: PhotoQueryDto) {
    return this.service.getPhoto(photo);
  }

  @Get('distance')
  public getDistance(@Query() query: DistanceQueryDto) {
    return this.service.getDistance(query);
  }

}
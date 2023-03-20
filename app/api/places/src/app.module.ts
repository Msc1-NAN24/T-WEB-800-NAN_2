import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RoomModule } from './room/room.module';
import { BarModule } from './bar/bar.module';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [RestaurantModule, RoomModule, BarModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

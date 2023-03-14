import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RoomModule } from './room/room.module';
import { BarModule } from './bar/bar.module';

@Module({
  imports: [RestaurantModule, RoomModule, BarModule],
})
export class AppModule {}

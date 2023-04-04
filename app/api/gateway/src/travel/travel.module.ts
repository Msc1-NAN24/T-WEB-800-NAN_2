import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.contoller';

@Module({
  providers: [TravelService],
  controllers: [TravelController],
})
export class TravelModule {}

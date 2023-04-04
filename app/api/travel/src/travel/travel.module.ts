import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from '../schema/travel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  providers: [TravelService],
  controllers: [TravelController],
})
export class TravelModule {}

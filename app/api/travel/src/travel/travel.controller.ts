import { TravelService } from './travel.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Travel } from '../schema/travel.schema';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  get() {
    return this.travelService.getService();
  }

  @Get('/owner/:owner')
  getByOwner(@Param('owner') owner: string) {
    return this.travelService.getServiceByOwner(owner);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.travelService.getServiceByID(id);
  }

  @Post()
  createTravel(@Body() travel: Partial<Travel>) {
    this.travelService.createTravel(travel);
  }

  @Patch('/:id')
  updateTravel(@Param('id') id: string, @Body() update: Partial<Travel>) {
    return this.travelService.updateTravel(id, update);
  }

  @Delete('/:id')
  deleteTravel(@Param('id') id: string) {
    return this.travelService.deleteTravel(id);
  }
}

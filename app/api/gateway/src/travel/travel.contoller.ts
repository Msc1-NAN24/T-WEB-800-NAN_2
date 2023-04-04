import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  get() {
    return this.travelService.get();
  }

  @Get('/owner/:owner')
  getByOwner(@Param('owner') owner: string) {
    return this.travelService.getByOwner(owner);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.travelService.getById(id);
  }

  @Post()
  createTravel(@Body() travel: any) {
    this.travelService.create(travel);
  }

  @Patch('/:id')
  updateTravel(@Param('id') id: string, @Body() update: any) {
    return this.travelService.updateTravel(id, update);
  }

  @Delete('/:id')
  deleteTravel(@Param('id') id: string) {
    return this.travelService.deleteTravel(id);
  }
}

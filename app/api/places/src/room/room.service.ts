import { Injectable } from '@nestjs/common';
import {RestaurantSearchQueryDto} from "../restaurant/restaurant.dto";
import {Client, Status} from "@googlemaps/google-maps-services-js";

@Injectable()
export class RoomService {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public async getNearby(params: RestaurantSearchQueryDto) {
    const a = await this.client.placesNearby({
      params: {
        key: process.env.GOOGLE_KEY ?? '',
        location: {
          lat: params.lat,
          lng: params.lng,
        },
        radius: params.radius,
        opennow: params.opennow,
        maxprice: params.maxprice,
        minprice: params.minprice,
        type: 'hostel',
      }
    });
    if (a.data.status === Status.ZERO_RESULTS) {
      return {
        places: []
      };
    }
    if (a.data.status === Status.OK) {
      return {
        places: a.data.results,
      };
    } else {
      return {
        error: 'An Google error occurred !',
      }
    }
  }

}

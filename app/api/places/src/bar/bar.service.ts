import { Injectable } from '@nestjs/common';
import {Client, Status} from "@googlemaps/google-maps-services-js";
import {RestaurantSearchQueryDto} from "../restaurant/restaurant.dto";

@Injectable()
export class BarService {

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
        type: 'sports_bar',
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

import { Injectable } from '@nestjs/common';
import {Client} from "@googlemaps/google-maps-services-js";
import {RestaurantSearchQueryDto} from "./restaurant.dto";

@Injectable()
export class RestaurantService {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public getNearby(params: RestaurantSearchQueryDto) {
    return this.client.placesNearby({
      params: {
        key: process.env.GOOGLE_KEY ?? '',
        location: params.location,
        radius: params.radius,
        opennow: params.opennow,
        maxprice: params.maxprice,
        minprice: params.minprice,
        type: 'restaurant',
      }
    })
  }

}

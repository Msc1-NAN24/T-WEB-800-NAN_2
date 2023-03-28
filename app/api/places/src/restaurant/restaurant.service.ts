import {Injectable} from '@nestjs/common';
import {Client, Status} from "@googlemaps/google-maps-services-js";
import {RestaurantSearchQueryDto} from "./restaurant.dto";

export type PlaceParams = {
  key: string;
  location: {
    lat: number;
    lng: number;
  },
  radius: number;
  opennow: boolean;
  maxprice: number;
  minprice: number;
}

@Injectable()
export class RestaurantService {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public async getNearby(params: RestaurantSearchQueryDto) {
    const p: PlaceParams = {
      key: process.env.GOOGLE_KEY ?? '',
      location: {
        lat: params.lat,
        lng: params.lng,
      },
      radius: params.radius,
      opennow: params.opennow,
      maxprice: params.maxprice,
      minprice: params.minprice,
    }
    const a = await this.client.placesNearby({
      params: {
        ...p,
        type: 'restaurant',
      }
    });
    if (a.data.status === Status.ZERO_RESULTS) {
      return {places: []};
    }
    if (a.data.status === Status.OK) {
      return {places: a.data.results};
    } else {
      return {
        error: 'An Google error occurred !',
      }
    }
  }

}

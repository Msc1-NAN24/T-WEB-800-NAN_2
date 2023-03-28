import {Injectable} from "@nestjs/common";
import {Client, Language, Status, TravelMode} from "@googlemaps/google-maps-services-js";

export class DetailQueryDto {
  place_id: string;
}

export class PhotoQueryDto {
  photo_reference: string;
}

export class DistanceQueryDto {
  origin: string;
  destination: string;
}

@Injectable()
export class AppService {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public async getPhoto(photo: PhotoQueryDto) {
    const res = await this.client.placePhoto({
      params: {
        key: process.env.GOOGLE_KEY ?? '',
        photoreference: photo.photo_reference,
        maxheight: 1200,
        maxwidth: 1200,
      },
      responseType: 'blob',
    });
    return res.data;
  }

  public async getDetail(query: DetailQueryDto) {
    const a = await this.client.placeDetails({
      params: {
        language: Language.fr,
        key: process.env.GOOGLE_KEY ?? '',
        place_id: query.place_id,
        fields: ['reviews', 'geometry', 'photo', 'place_id', 'name', 'opening_hours', 'rating']
      }
    });
    if (a.data.status === Status.OK) {
      return a.data.result;
    } else {
      return {
        error: 'An Google error occurred !'
      }
    }
  }

  public async getDistance(query: DistanceQueryDto) {
   try {
     const a = await this.client.distancematrix({
       params: {
         origins: ['place_id:' + query.origin],
         destinations: ['place_id:' + query.destination],
         key: process.env.GOOGLE_KEY ?? '',
         language: Language.fr,
         mode: TravelMode.walking,
       }
     });
     console.log(a.data);
     if (a.data.status === Status.OK) {
       return a.data.rows;
     } else {
       return {
         error: 'An Google error occurred !'
       }
     }
   } catch (ex) {
     console.log(ex);
   }
  }

}
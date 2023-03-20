import {Injectable} from "@nestjs/common";
import {Client, Status} from "@googlemaps/google-maps-services-js";

export class DetailQueryDto {
  place_id: string;
}

export class PhotoQueryDto {
  photo_reference: string;
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
        key: process.env.GOOGLE_KEY ?? '',
        place_id: query.place_id,
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

}
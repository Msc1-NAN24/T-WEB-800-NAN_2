import { Injectable } from '@nestjs/common';
import axios from "axios";

export interface EventResponse {
  error:   number;
  message: string;
  data:    Datum[];
  count:   number;
}

export interface Datum {
  organizer_id:      string;
  name:              string;
  about:             string;
  events_count:      string;
  facebook_id:       string;
  twitter:           string;
  thumb_url:         string;
  website:           string;
  facebook_username: string;
  following_count:   string;
  followers_count:   string;
  score:             string;
  is_following:      string;
  organizer_url:     string;
}


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public async getEvent(cityName: string) {
    const response = await axios.post<EventResponse>('https://allevents.in/api/index.php/organizer/web/city/list', {
      query: cityName,
    });
    if (response.data.error >= 1) {
      return [];
    } else {
      return response.data.data;
    }
  }

}

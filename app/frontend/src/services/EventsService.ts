import {API} from "@/utils/api";
import {ApiError, Result} from "@/utils/type";
import {GetEventBody, LocalEvent} from "@/services/EventsService.type";

export class EventsService {

  public static get(body: GetEventBody, callback: (result: Result<LocalEvent[], ApiError>) => void) {
    //API.get<LocalEvent[], ApiError>('/events/', body, {}, (result) => callback(result));
  }

  public static async getByCity(city: string, params?: URLSearchParams): Promise<Result<LocalEvent[], unknown>> {
    return API.get<LocalEvent[], any>(`/events/${city}`, params);
  }

}
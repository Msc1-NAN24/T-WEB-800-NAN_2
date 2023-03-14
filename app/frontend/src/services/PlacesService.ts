import {API} from "@/utils/api";
import {ApiError, Result} from "@/utils/type";
import {PlacesQueryBody, PlacesQueryResponse} from "@/services/PlacesService.type";

export class PlacesService {

  public static search(body: PlacesQueryBody, callback: (result: Result<PlacesQueryResponse, ApiError>) => void) {
    API.post<PlacesQueryResponse, ApiError>('/places/search', body, {}, (result) => callback(result));
  }
  
}
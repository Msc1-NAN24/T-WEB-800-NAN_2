import {API} from "@/utils/api";
import {ApiError} from "@/utils/type";
import {DetailQueryDto, PhotoQueryDto, PlaceDetailResponse, PlacesQueryBody, PlacesQueryResponse} from "@/services/PlacesService.type";

export class PlacesService {

  public static getPhoto(body: PhotoQueryDto) {
    return API.getBlob<String, ApiError>('/places/photo', new URLSearchParams({
      photo_reference: body.photo_reference,
    }))
  }

  public static detail(body: DetailQueryDto) {
    return API.get<PlaceDetailResponse, ApiError>('/places/detail', new URLSearchParams({
      place_id: body.place_id
    }));
  }

  public static searchRestaurant(body: PlacesQueryBody) {
    return API.get<PlacesQueryResponse, ApiError>('/places/restaurant/search', new URLSearchParams({
      lat: String(body.location.lat),
      lng: String(body.location.lng),
      radius: String(body.radius)
    }), {});
  }

  public static searchHostel(body: PlacesQueryBody) {
    return API.get<PlacesQueryResponse, ApiError>('/places/room/search', new URLSearchParams({
      lat: String(body.location.lat),
      lng: String(body.location.lng),
      radius: String(body.radius)
    }), {});
  }

  public static searchActivity(body: PlacesQueryBody) {
    return API.get<PlacesQueryResponse, ApiError>('/places/activity/search', new URLSearchParams({
      lat: String(body.location.lat),
      lng: String(body.location.lng),
      radius: String(body.radius)
    }), {});
  }

  public static searchBar(body: PlacesQueryBody) {
    return API.get<PlacesQueryResponse, ApiError>('/places/bar/search', new URLSearchParams({
      lat: String(body.location.lat),
      lng: String(body.location.lng),
      radius: String(body.radius)
    }), {});
  }
  
}
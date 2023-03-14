export type PlaceType = 'hostel' | 'restaurant';

export type GeoPoint = {
  lat: number;
  lng: number;
};


export class PlacesQueryBody {
  location: GeoPoint;
  types: PlaceType[];

  constructor(location: GeoPoint, types: PlaceType[]) {
    this.location = location;
    this.types = types;
  }
}

export class PlacesQueryResponse {

}
export type PlaceType = 'hostel' | 'restaurant';

export type GeoPoint = {
  lat: number;
  lng: number;
};

export class PhotoQueryDto {
  photo_reference: string;

  constructor(photo_reference: string) {
    this.photo_reference = photo_reference;
  }
}

export class DetailQueryDto {
  place_id: string;

  constructor(place_id: string) {
    this.place_id = place_id;
  }
}

export class PlacesQueryBody {
  location: GeoPoint;
  radius: number;

  constructor(location: GeoPoint, radius: number) {
    this.location = location;
    this.radius = radius;
  }
}

export interface PlaceDetailResponse {
  address_components:             AddressComponent[];
  adr_address:                    string;
  business_status:                string;
  current_opening_hours:          CurrentOpeningHours;
  editorial_summary:              EditorialSummary;
  formatted_address:              string;
  formatted_phone_number:         string;
  geometry:                       Geometry;
  icon:                           string;
  icon_background_color:          string;
  icon_mask_base_uri:             string;
  international_phone_number:     string;
  name:                           string;
  opening_hours:                  OpeningHours;
  photos:                         Photo[];
  place_id:                       string;
  plus_code:                      PlusCode;
  rating:                         number;
  reference:                      string;
  reviews:                        Review[];
  types:                          string[];
  url:                            string;
  user_ratings_total:             number;
  utc_offset:                     number;
  vicinity:                       string;
  website:                        string;
  wheelchair_accessible_entrance: boolean;
}

export interface AddressComponent {
  long_name:  string;
  short_name: string;
  types:      string[];
}

export interface CurrentOpeningHours {
  open_now:     boolean;
  periods:      CurrentOpeningHoursPeriod[];
  weekday_text: string[];
}

export interface CurrentOpeningHoursPeriod {
  close: PurpleClose;
  open:  PurpleClose;
}

export interface PurpleClose {
  date: Date;
  day:  number;
  time: string;
}

export interface EditorialSummary {
  language: string;
  overview: string;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface OpeningHours {
  open_now:     boolean;
  periods:      OpeningHoursPeriod[];
  weekday_text: string[];
}

export interface OpeningHoursPeriod {
  close: FluffyClose;
  open:  FluffyClose;
}

export interface FluffyClose {
  day:  number;
  time: string;
}

export interface Photo {
  height:            number;
  html_attributions: string[];
  photo_reference:   string;
  width:             number;
}

export interface PlusCode {
  compound_code: string;
  global_code:   string;
}

export interface Review {
  author_name:               string;
  author_url:                string;
  language:                  string;
  original_language:         string;
  profile_photo_url:         string;
  rating:                    number;
  relative_time_description: string;
  text:                      string;
  time:                      number;
  translated:                boolean;
}


export class PlacesQueryResponse {
  places: Place[];

  constructor(places: Place[]) {
    this.places = places;
  }
}

export interface Place {
  business_status:       BusinessStatus;
  geometry:              Geometry;
  icon:                  string;
  icon_background_color: IconBackgroundColor;
  icon_mask_base_uri:    string;
  name:                  string;
  opening_hours:         OpeningHours;
  photos:                Photo[];
  place_id:              string;
  plus_code:             PlusCode;
  rating:                number;
  reference:             string;
  scope:                 Scope;
  types:                 Type[];
  user_ratings_total:    number;
  vicinity:              string;
  price_level?:          number;
}

export enum BusinessStatus {
  Operational = "OPERATIONAL",
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export enum IconBackgroundColor {
  Ff9E67 = "#FF9E67",
  The909Ce1 = "#909CE1",
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Photo {
  height:            number;
  html_attributions: string[];
  photo_reference:   string;
  width:             number;
}

export interface PlusCode {
  compound_code: string;
  global_code:   string;
}

export enum Scope {
  Google = "GOOGLE",
}

export enum Type {
  Bar = "bar",
  Establishment = "establishment",
  Food = "food",
  Lodging = "lodging",
  MealDelivery = "meal_delivery",
  MealTakeaway = "meal_takeaway",
  PointOfInterest = "point_of_interest",
  Restaurant = "restaurant",
}
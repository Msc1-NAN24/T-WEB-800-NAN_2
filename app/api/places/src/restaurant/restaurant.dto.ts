export type RestaurantSearchQueryDto = {
  location: {
    lat: number;
    lng: number;
  }
  radius: number;
  maxprice?: number;
  minprice?: number;
  opennow?: boolean;
}
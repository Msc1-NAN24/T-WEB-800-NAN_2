import { Type } from "class-transformer";
import { IsOptional, Max, Min, IsDefined} from "class-validator";

export class RestaurantSearchQueryDto {

  @IsDefined()
  @Type(() => Number)
  lat: number;

  @IsDefined()
  @Type(() => Number)
  lng: number;

  @IsDefined()
  @Type(() => Number)
  radius: number;

  @IsOptional()
  @Max(4)
  @Min(0)
  @Type(() => Number)
  maxprice?: number;

  @IsOptional()
  @Max(4)
  @Min(0)
  @Type(() => Number)
  minprice?: number;

  @IsOptional()
  @Type(() => Boolean)
  opennow?: boolean;
}
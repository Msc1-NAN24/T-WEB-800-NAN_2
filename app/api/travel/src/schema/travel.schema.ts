import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Travel {
  @Prop({ required: true })
  owner: string;
  @Prop()
  name: string;

  @Prop()
  shareable: boolean;

  @Prop([])
  service: [];
}

export type TravelDocument = HydratedDocument<Travel>;
export const TravelSchema = SchemaFactory.createForClass(Travel);

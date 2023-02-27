import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  lastName: string;
  @Prop()
  firstName: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop({ unique: true })
  phone: string;
  @Prop()
  picture: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

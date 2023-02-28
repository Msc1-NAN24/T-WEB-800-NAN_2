import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: false })
  lastName: string;
  @Prop({ unique: false })
  firstName: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop({ unique: true, isRequired: false })
  phone?: string;
  @Prop({ isRequired: false })
  picture?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

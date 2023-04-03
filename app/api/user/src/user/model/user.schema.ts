import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, unique: false })
  lastName: string;
  @Prop({ trim: true, unique: false })
  firstName: string;
  @Prop({ trim: true, unique: true })
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop({ trim: true, index: true, unique: true, sparse: true })
  phone: string;
  @Prop({
    isRequired: false,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
  })
  picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

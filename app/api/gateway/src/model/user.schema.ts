import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({ trim: true, unique: false })
  @IsString()
  lastName: string;
  @Prop({ trim: true, unique: false })
  @ApiProperty()
  @IsString()
  firstName: string;
  @Prop({ trim: true, unique: true })
  @ApiProperty()
  @IsEmail()
  email: string;
  @Prop({ select: false })
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
  @Prop({ trim: true, index: true, unique: true, sparse: true })
  @ApiProperty()
  @IsPhoneNumber('FR')
  phone: string;
  @Prop({
    isRequired: false,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
  })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

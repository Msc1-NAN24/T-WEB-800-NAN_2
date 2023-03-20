import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/user.dto';
import { User, UserDocument } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: createUserDto): Promise<UserDocument> {
    const { password, ...user } = createUserDto;
    return await this.userModel.create({
      ...user,
      password: await bcrypt.hash(password, 10),
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(
    unique: FilterQuery<User>,
    select?: any,
  ): Promise<UserDocument> {
    return this.userModel.findOne(unique).select(select).exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndRemove(id, { new: true }).exec();
  }

  async updateUser(id, update: Partial<User>): Promise<UserDocument> {
    return await this.userModel
      .findOneAndUpdate({ _id: id }, update, { new: true })
      .exec();
  }
}

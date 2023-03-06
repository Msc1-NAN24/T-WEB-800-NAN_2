import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/user.dto';
import { User, UserDocument } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: createUserDto): Promise<UserDocument> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(unique: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(unique).exec();
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

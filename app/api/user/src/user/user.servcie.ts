import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: createUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(unique: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(unique).exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  async updateUser(id, update: Partial<User>) {
    return await this.userModel.findOneAndUpdate({ _id: id }, update).exec();
  }
}

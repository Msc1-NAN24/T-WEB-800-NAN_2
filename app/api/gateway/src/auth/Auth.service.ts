import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.schema';
import { createUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    console.log('ValidateUser');
    const user = await this.userModel.findOne({ email }, '+password');
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log({ user, isMatch });
    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUser: createUserDto) {
    const user = await this.usersService.createUser(createUser);
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

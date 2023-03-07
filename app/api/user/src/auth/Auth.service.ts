import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/model/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createUserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email }, '+password');
    const isMatch = await bcrypt.compare(pass, user.password);
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
    const user = await this.usersService.create(createUser);
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

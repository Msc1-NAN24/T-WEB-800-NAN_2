import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.schema';
import { Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  getAllUser() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.userService.findOne({ _id: userId });
  }

  @Get('email')
  getUserByEmail(@Query('email') email: string) {
    return this.userService.findOne({ email });
  }

  @Post('')
  create(@Body() user) {
    return this.userService.create(user);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: string, @Body() update: Partial<User>) {
    return this.userService.updateUser(userId, update);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }
}

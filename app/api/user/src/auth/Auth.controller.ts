import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthGuard } from '@nestjs/passport';
import { createUserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() createUser: createUserDto) {
    return this.authService.register(createUser);
  }
}

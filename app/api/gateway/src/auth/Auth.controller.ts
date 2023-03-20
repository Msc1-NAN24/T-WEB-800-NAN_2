import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './Auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../model/user.schema';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
} from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiBody({
    type: LoginRequestDto,
  })
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Register successful',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: User })
  register(@Body() createUser: User) {
    return this.authService.register(createUser);
  }
}

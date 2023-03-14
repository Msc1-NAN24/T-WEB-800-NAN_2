import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { User } from '../model/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiResponse({ type: [OmitType(User, ['password'])] })
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: OmitType(User, ['password']),
  })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
  })
  getUser(@Param('id') userId: string) {
    return this.userService.getUserById({ _id: userId });
  }

  @Post('')
  @ApiCreatedResponse({ description: 'User created' })
  create(@Body() user) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: User,
  })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
  })
  @ApiBody({ type: PartialType(User) })
  updateUser(@Param('id') userId: string, @Body() update: Partial<User>) {
    return this.userService.updateUser(userId, update);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/plan/:userId')
  @ApiOperation({ summary: 'Update user plan' })
  updatePlanUser(@Param('userId') userId: string) {
    return this.userService.updatePlanUser(userId);
  }

  @Get(':clerkid')
  @ApiOperation({ summary: 'Get user by clerkid' })
  getUserByClerkId(@Param('clerkid') clerkid: string) {
    return this.userService.getUserByClerkId(clerkid);
  }
}

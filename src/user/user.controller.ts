import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { GetUserId } from 'src/decorators/get-user.decorator';
import { AuthenticationGuard } from 'src/user/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: LoginDto })
  login(@Body('token') token: string) {
    return this.userService.login(token);
  }

  @ApiSecurity('token')
  @UseGuards(AuthenticationGuard())
  @Get()
  @ApiOperation({ summary: 'Get user by id' })
  getUserById(@GetUserId() userId: string) {
    return this.userService.getUserById(userId);
  }

  @Get('/plan/:userId')
  @ApiOperation({ summary: 'Update user plan' })
  updatePlanUser(@Param('userId') userId: string) {
    return this.userService.updatePlanUser(userId);
  }
}

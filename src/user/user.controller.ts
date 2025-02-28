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
import { Login2Dto } from './dto/login2-dto';

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

  @Post('login2')
  @ApiOperation({ summary: 'login2' })
  @ApiBody({ type: Login2Dto })
  login2(@Body() login2Dto: Login2Dto) {
    const { accessToken } = login2Dto;
    return this.userService.login2(accessToken);
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

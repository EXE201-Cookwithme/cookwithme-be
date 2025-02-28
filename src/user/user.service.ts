import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserPlan } from 'src/constants';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  private client = new OAuth2Client(
    this.configService.get<string>('GOOGLE_CLIENT_ID'),
    this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
  );

  async login(token: string) {
    const res = await this.client.verifyIdToken({
      idToken: token,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });
    const data = res.getPayload();
    const userByEmail = await this.userRepository.getUserByEmail(data.email);
    if (!userByEmail) {
      const newUser = await this.userRepository.create({
        email: data.email,
        firstname: data.given_name,
        lastname: data.family_name,
        image: data.picture,
      });
      const accessToken = this.generateToken(newUser._id);
      return {
        data: {
          accessToken,
        },
        message: 'User logged in successfully',
      };
    }
    const accessToken = this.generateToken(userByEmail._id);
    return {
      data: {
        accessToken,
      },
      message: 'User logged in successfully',
    };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    return { data: user, message: 'User fetched successfully' };
  }

  async updatePlanUser(id: string) {
    const user = await this.userRepository.updatePlanUser(id, UserPlan.PRO);
    return { data: user, message: 'User updated successfully' };
  }

  private generateToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
}

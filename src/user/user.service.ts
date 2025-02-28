import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserPlan } from 'src/constants';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { createErrorHandler } from 'src/exception-filters/axios-error-handler';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}
  private client = new OAuth2Client(
    this.configService.get<string>('GOOGLE_CLIENT_ID'),
    this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
  );
  private readonly logger = new Logger(UserService.name);
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

  async login2(accessTokenBody: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessTokenBody}` },
        })
        .pipe(catchError(createErrorHandler(this.logger, 'login2 gg'))),
    );
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

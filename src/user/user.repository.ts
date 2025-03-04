import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPlan } from 'src/constants';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async getUserByClerkId(clerkid: string): Promise<User> {
    const user = await this.userModel.findOne({ clerkid }).exec();
    if (!user) {
      throw new UnauthorizedException(`User ${clerkid} not found`);
    }
    return user;
  }

  async updatePlanUser(id: string, plan: UserPlan): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { plan }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }
}

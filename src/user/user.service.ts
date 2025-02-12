import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPlan } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return { data: user, message: 'User created successfully' };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    return { data: user, message: 'User fetched successfully' };
  }

  async getUserByClerkId(clerkid: string) {
    const user = await this.userRepository.getUserByClerkId(clerkid);
    return { data: user, message: 'User fetched successfully' };
  }

  async updatePlanUser(id: string) {
    const user = await this.userRepository.updatePlanUser(id, UserPlan.PRO);
    return { data: user, message: 'User updated successfully' };
  }
}

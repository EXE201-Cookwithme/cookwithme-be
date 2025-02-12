import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workshop } from './workshop.schema';
import { Model } from 'mongoose';
import { CreateWorkshopDto } from './dto/create-workshop.dto';

@Injectable()
export class WorkshopRepository {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<Workshop>,
  ) {}

  async createWorkshop(createWorkshopDto: CreateWorkshopDto) {
    const workshop = await this.workshopModel.create(createWorkshopDto);
    return workshop;
  }

  async getAllWorkshops() {
    const workshops = await this.workshopModel.find().exec();
    return workshops;
  }

  async getWorkshopById(id: string) {
    const workshop = await this.workshopModel.findById(id).exec();
    if (!workshop) {
      throw new NotFoundException(`Workshop ${id} not found`);
    }
    return workshop;
  }
}

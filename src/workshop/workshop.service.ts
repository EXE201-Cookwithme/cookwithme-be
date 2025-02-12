import { Injectable } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { WorkshopRepository } from './workshop.repository';

@Injectable()
export class WorkshopService {
  constructor(private workshopRepository: WorkshopRepository) {}
  async createWorkshop(createWorkshopDto: CreateWorkshopDto) {
    const newWorkshop =
      await this.workshopRepository.createWorkshop(createWorkshopDto);
    return { data: newWorkshop, message: 'Workshop created successfully' };
  }

  async getAllWorkshops() {
    const workshops = await this.workshopRepository.getAllWorkshops();
    return { data: workshops, message: 'Workshops fetched successfully' };
  }

  async getWorkshopById(id: string) {
    const workshop = await this.workshopRepository.getWorkshopById(id);
    return { data: workshop, message: 'Workshop fetched successfully' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  createWorkshop(@Body() createWorkshopDto: CreateWorkshopDto) {
    return this.workshopService.createWorkshop(createWorkshopDto);
  }

  @Get()
  getAllWorkshops() {
    return this.workshopService.getAllWorkshops();
  }

  @Get(':id')
  getWorkshopById(@Param('id') id: string) {
    return this.workshopService.getWorkshopById(id);
  }
}

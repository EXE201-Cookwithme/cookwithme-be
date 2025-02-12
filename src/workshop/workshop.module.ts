import { Module } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { WorkshopController } from './workshop.controller';
import { WorkshopRepository } from './workshop.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Workshop, WorkshopSchema } from './workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workshop.name, schema: WorkshopSchema },
    ]),
  ],
  controllers: [WorkshopController],
  providers: [WorkshopService, WorkshopRepository],
})
export class WorkshopModule {}

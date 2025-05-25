import { Module } from '@nestjs/common';
import { TaskGroupsService } from './task-groups.service';
import { TaskGroupsController } from './task-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskGroup, TaskGroupSchema } from './entities/task-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskGroup.name, schema: TaskGroupSchema },
    ]),
  ],
  controllers: [TaskGroupsController],
  providers: [TaskGroupsService],
  exports: [TaskGroupsService],
})
export class TaskGroupsModule {}

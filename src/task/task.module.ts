import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskController } from './task.controller.js';
import { TaskHandler } from './task.handler.js';
import { TaskService } from './task.service.js';
import { Task, TaskSchema } from './task.schema.js';
import { EventStoreService } from '../event-store/event-store.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskHandler, EventStoreService],
})
export class TaskModule {}
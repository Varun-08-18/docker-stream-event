
import { Body, Controller, Post } from '@nestjs/common';
import { EventStoreService } from '../event-store/event-store.service.js';
import { TaskHandler } from './task.handler.js';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly taskHandler: TaskHandler,
  ) {}

  @Post()
  async createTask(
    @Body() payload: { title: string; status?: string },
  ) {
    // 1. Save event first
    const event = await this.eventStoreService.storeEvent(
      'TaskCreated',
      payload,
    );

    // 2. Pass saved event to handler
    const task = await this.taskHandler.handleEvent(event);

    // 3. Return result
    return {
      message: 'Task created successfully',
      event,
      task,
    };
  }
}

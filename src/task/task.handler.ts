
import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service.js';

@Injectable()
export class TaskHandler {
  constructor(private readonly taskService: TaskService) {}

  async handleEvent(event: {
    eventType: string;
    payload: { title: string; status?: string };
  }) {
    switch (event.eventType) {
      case 'TaskCreated':
        return this.taskService.createTask({
          title: event.payload.title,
          status: event.payload.status ?? 'Pending',
        });

      default:
        throw new BadRequestException(
          `Unsupported event type: ${event.eventType}`,
        );
    }
  }
}

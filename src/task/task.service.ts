import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema.js';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  async createTask(payload: { title: string; status?: string }) {
    return this.taskModel.create({
      title: payload.title,
      status: payload.status ?? 'Pending',
    });
  }
}

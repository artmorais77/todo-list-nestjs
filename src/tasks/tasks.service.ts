import { Injectable } from '@nestjs/common';
import { TasksDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private readonly tasks: TasksDto[] = [];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  create(task: TasksDto) {
    const nextId = this.tasks.length + 1;
    const newTask = task;
    newTask.id = nextId;
    return this.tasks.push(newTask);
  }
}

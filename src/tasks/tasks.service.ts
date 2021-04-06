import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    createTask(title: string, status: string): Task {
        const task = new Task(title, status);
        this.tasks.push(task);
        return task;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    searchTasks(query: string): Task[] {
        return this.tasks.filter(task => task.description.includes(query));
    }

    getTask(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException('Task not found');
        }
        return found;
    }

    deleteTask(id: string): Task[] {
        const task = this.getTask(id);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        return this.tasks;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTask(id);
        task.setStatus(status);
        return task;
    }
}

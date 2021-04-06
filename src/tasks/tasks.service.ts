import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

    async createTask(title: string, description: string = '', status: string): Promise<Task> {
        const createdTask = new this.taskModel({ title, description, status });
        return await createdTask.save();
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskModel.find({});
    }

    async getTask(id: string): Promise<Task> {
        let found;

        try {
            found = await this.taskModel.findOne({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if (!found) {
            throw new NotFoundException('Task not found');
        }

        return found;
    }

    async deleteTask(id: string): Promise<Task[]> {
        await this.getTask(id);

        try {
            await this.taskModel.deleteOne({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return this.getAllTasks();
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTask(id);
        task.status = status;
        try {
            task.status = status;
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return task;
    }
}

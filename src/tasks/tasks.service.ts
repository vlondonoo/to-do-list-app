import { Injectable,InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  
    constructor(
        @InjectRepository(TaskEntity)
        private readonly tasksRepository: Repository<TaskEntity>,
      ) {}


      async createTask(task): Promise<TaskEntity> {
        await this.tasksRepository.insert(task);
        return  task
    }

    

    async getAllTasks(): Promise<TaskEntity[]> {
        return await this.tasksRepository.find({});
    }


    async getTask(id: string): Promise<TaskEntity> {
        let found;

        try {
            found = await this.tasksRepository.findOne({ id });
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if (!found) {
            throw new NotFoundException('Task not found');
        }

        return found;
    }
  
    async deleteTask(id: string): Promise<TaskEntity[]> {
        await this.getTask(id);

        try {
            await this.tasksRepository.delete({ id});
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return this.getAllTasks();
    }
    

    async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
        const task = await this.getTask(id);

        try {
            task.status = status;
            await this.tasksRepository.save(task);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return task;
    }
}


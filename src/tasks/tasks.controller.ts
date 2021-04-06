import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskStatusValidationPipe } from './task-status-validation.pipe';
import { TaskEntity } from './task.entity';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Post()
    createTask(@Body() body) {
        return this.tasksService.createTask(body);
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Put(':id')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', new TaskStatusValidationPipe()) status,
    ) {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

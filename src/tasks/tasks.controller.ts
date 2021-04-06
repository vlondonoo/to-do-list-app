import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Post()
    createTask(@Body() body) {
        return this.tasksService.createTask(body.title, body.description, body.status);
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

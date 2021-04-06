import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskStatusValidationPipe } from './task-status-validation.pipe';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Post()
    createTask(@Body() body): Task {
        return this.tasksService.createTask(body.title, body.status);
    }

    @Get()
    getTasks(@Query('search') searchQuery: string): Task[] {
        if (searchQuery) {
            return this.tasksService.searchTasks(searchQuery);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get(':id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Put(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', new TaskStatusValidationPipe()) status,
    ) {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

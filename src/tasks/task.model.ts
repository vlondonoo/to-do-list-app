import * as shortid from 'shortid';
import { TaskStatus } from './task-status.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class Task {
    public id: string;
    public title: string;
    public description: string;
    public status: TaskStatus;

    constructor(title: string, description: string) {
        this.id = shortid.generate();
        this.title = title
        this.description = description;
        this.status = TaskStatus.OPEN;
    }

    setStatus(status: TaskStatus) {
        this.status = status;
    }

    static isStatusValid(status: string) {
        const validStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
        return validStatuses.some(validStatus => status === validStatus);
    }
}
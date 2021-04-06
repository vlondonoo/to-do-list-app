import { TaskStatus } from './task-status.enum';
import { Document } from 'mongoose'

export class Task extends Document{
    public title: string;
    public description: string;
    public status: TaskStatus;

}
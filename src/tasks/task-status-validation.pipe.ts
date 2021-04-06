import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valid = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE].some(validStatus => value === validStatus);

    if (!valid) {
      throw new BadRequestException('Invalid status provided');
    }

    return value;
  }
}

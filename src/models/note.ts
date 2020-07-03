import { Task } from './task';

export interface Note {
  id: string,
  tasks: Task[],
}

import { Task } from './task';

export interface Note {
  id: string,
  title: string,
  tasks: Task[],
}

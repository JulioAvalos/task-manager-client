export interface IAssignee {
  fullName: string;
  avatar: string;
  id: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BACKLOG' | 'CANCELLED';
export type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT';

export interface ITask {
  id: string;
  name: string;
  dueDate: string;
  status: TaskStatus;
  pointEstimate: PointEstimate;
  assignee: IAssignee;
  tags: string[];
}

export interface IGetTasksResponse {
  tasks: ITask[];
}

export interface ICreateTaskResponse {
  createTask: ITask;
}

export interface IUpdateTaskResponse {
  updateTask: ITask;
}

export interface IDeleteTaskResponse {
  deleteTask: {
    id: string;
  };
}

export interface ICreateTaskInput {
  assigneeId?: string;
  dueDate: string;
  name: string;
  pointEstimate: PointEstimate;
  status: TaskStatus;
  tags: string[];
}

export interface IUpdateTaskInput {
  assigneeId?: string;
  dueDate?: string;
  id: string;
  name?: string;
  pointEstimate?: PointEstimate;
  position?: number;
  status?: TaskStatus;
  tags?: string[];
}

export interface IFilterTaskInput {
  assigneeId?: string;
  dueDate?: string;
  name?: string;
  ownerId?: string;
  pointEstimate?: PointEstimate;
  status?: TaskStatus;
  tags?: string[];
}

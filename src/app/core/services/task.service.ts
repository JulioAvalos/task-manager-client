import {Injectable} from '@angular/core';
import {Apollo, gql, MutationResult, QueryRef} from 'apollo-angular';
import {Observable} from 'rxjs';
import {
  ICreateTaskInput,
  ICreateTaskResponse,
  IDeleteTaskResponse, IFilterTaskInput,
  IGetTasksResponse, ITask,
  IUpdateTaskInput,
  IUpdateTaskResponse
} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apollo: Apollo) {
  }

  private TAGS_FILTER = {tags: ['REACT', 'ANDROID', 'IOS', 'NODE_JS', 'RAILS']};

  private GET_TASKS_QUERY = gql`
    query GetTasks($input: FilterTaskInput!) {
      tasks(input: $input) {
        id
        creator {
          id
          fullName
          email
          avatar
        }
        name
        status
        pointEstimate
        tags
        dueDate
        position
        assignee {
          avatar
          fullName
          id
        }
      }
    }
  `;

  getTasks(filters: IFilterTaskInput): QueryRef<IGetTasksResponse> {

    return this.apollo
      .watchQuery<IGetTasksResponse>({
        query: this.GET_TASKS_QUERY,
        variables: {input: filters},
      });
  }

  createTask(taskInput: ICreateTaskInput): Observable<MutationResult<ICreateTaskResponse>> {
    const CREATE_TASK = gql`
      mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
          id
          name
          dueDate
          status
          pointEstimate
          tags
          assignee {
            id
            fullName
            avatar
          }
        }
      }
    `;

    return this.apollo.mutate<ICreateTaskResponse>({
      mutation: CREATE_TASK,
      variables: {input: taskInput},
      update: (cache, {data}) => {
        if (data?.createTask) {
          const newTask = data.createTask;
          cache.updateQuery({
            query: this.GET_TASKS_QUERY,
            variables: {input: this.TAGS_FILTER},
          }, (existingData: any) => {
            const updatedTasks = existingData ? [...existingData.tasks, newTask] : [newTask];
            return {
              tasks: updatedTasks,
            };
          });
        }
      },
    });
  }

  updateTask(taskInput: IUpdateTaskInput): Observable<MutationResult<IUpdateTaskResponse>> {
    const UPDATE_TASK = gql`
      mutation UpdateTask($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          id
          name
          status
          pointEstimate
          dueDate
          tags,
          assignee {
            id
            fullName
            avatar
          }
        }
      }
    `;
    return this.apollo.mutate<IUpdateTaskResponse>({
      mutation: UPDATE_TASK,
      variables: {input: taskInput},
    });
  }

  deleteTask(taskId: string): Observable<MutationResult<IDeleteTaskResponse>> {
    const DELETE_TASK = gql`
      mutation DeleteTask($input: DeleteTaskInput!) {
        deleteTask(input: $input) {
          id
        }
      }
    `;

    return this.apollo.mutate<IDeleteTaskResponse>({
      mutation: DELETE_TASK,
      variables: {input: {id: taskId}},
      update: (cache, {data}) => {
        if (data?.deleteTask) {
          const deletedTaskId = data.deleteTask.id;
          cache.updateQuery({
            query: this.GET_TASKS_QUERY,
            variables: {input: this.TAGS_FILTER}
          }, (existingData: any) => {
            if (existingData && existingData.tasks) {
              const updatedTasks = existingData.tasks.filter((task: ITask) => task.id !== deletedTaskId);
              return {
                tasks: updatedTasks,
              };
            } else {
              return {tasks: []};
            }
          });
        }
      },
    });
  }

}

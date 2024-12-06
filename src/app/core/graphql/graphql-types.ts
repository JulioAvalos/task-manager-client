import {gql} from 'apollo-angular';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  pointEstimate: PointEstimate;
  status: Status;
  tags: Array<TaskTag>;
};

export type DeleteTaskInput = {
  id: Scalars['String']['input'];
};

export type FilterTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Task;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

/** Estimate point for a task */
export enum PointEstimate {
  Eight = 'EIGHT',
  Four = 'FOUR',
  One = 'ONE',
  Two = 'TWO',
  Zero = 'ZERO'
}

export type Query = {
  __typename?: 'Query';
  profile: User;
  tasks: Array<Task>;
  users: Array<User>;
};


export type QueryTasksArgs = {
  input: FilterTaskInput;
};

/** Status for Task */
export enum Status {
  Backlog = 'BACKLOG',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pointEstimate: PointEstimate;
  position: Scalars['Float']['output'];
  status: Status;
  tags: Array<TaskTag>;
};

/** Enum for tags for tasks */
export enum TaskTag {
  Android = 'ANDROID',
  Ios = 'IOS',
  NodeJs = 'NODE_JS',
  Rails = 'RAILS',
  React = 'REACT'
}

export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  position?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: UserType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Type of the User */
export enum UserType {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE'
}

export type GetTasksQueryVariables = Exact<{
  input: FilterTaskInput;
}>;


export type GetTasksQuery = {
  __typename?: 'Query',
  tasks: Array<{
    __typename?: 'Task',
    id: string,
    name: string,
    dueDate: any,
    status: Status,
    pointEstimate: PointEstimate,
    tags: Array<TaskTag>,
    assignee?: { __typename?: 'User', fullName: string, avatar?: string | null } | null
  }>
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = {
  __typename?: 'Mutation',
  createTask: {
    __typename?: 'Task',
    id: string,
    name: string,
    dueDate: any,
    status: Status,
    pointEstimate: PointEstimate,
    tags: Array<TaskTag>
  }
};

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = {
  __typename?: 'Mutation',
  updateTask: {
    __typename?: 'Task',
    id: string,
    name: string,
    status: Status,
    pointEstimate: PointEstimate,
    dueDate: any,
    tags: Array<TaskTag>
  }
};

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', id: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = {
  __typename?: 'Query',
  profile: { __typename?: 'User', id: string, fullName: string, email: string, avatar?: string | null, type: UserType }
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = {
  __typename?: 'Query',
  users: Array<{
    __typename?: 'User',
    id: string,
    fullName: string,
    email: string,
    avatar?: string | null,
    type: UserType
  }>
};

export const GetTasksDocument = gql`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      status
      pointEstimate
      assignee {
        fullName
        avatar
      }
      tags
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GetTasksGQL extends Apollo.Query<GetTasksQuery, GetTasksQueryVariables> {
  document = GetTasksDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const CreateTaskDocument = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      dueDate
      status
      pointEstimate
      tags
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CreateTaskGQL extends Apollo.Mutation<CreateTaskMutation, CreateTaskMutationVariables> {
  document = CreateTaskDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const UpdateTaskDocument = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      status
      pointEstimate
      dueDate
      tags
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskGQL extends Apollo.Mutation<UpdateTaskMutation, UpdateTaskMutationVariables> {
  document = UpdateTaskDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const DeleteTaskDocument = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskGQL extends Apollo.Mutation<DeleteTaskMutation, DeleteTaskMutationVariables> {
  document = DeleteTaskDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const ProfileDocument = gql`
  query Profile {
    profile {
      id
      fullName
      email
      avatar
      type
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProfileGQL extends Apollo.Query<ProfileQuery, ProfileQueryVariables> {
  document = ProfileDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const UsersDocument = gql`
  query Users {
    users {
      id
      fullName
      email
      avatar
      type
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
  document = UsersDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

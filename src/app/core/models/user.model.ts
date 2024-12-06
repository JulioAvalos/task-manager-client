export interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
}

export interface IGetUsersResponse {
  users: IUser[];
}

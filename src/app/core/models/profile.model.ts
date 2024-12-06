export interface IProfile {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetProfile {
  profile: IProfile
}

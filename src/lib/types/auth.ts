export interface ILoginBody {
  email: string;
  password: string;
}

export interface IRefreshBody {
  refresh_token?: string;
}

export type IRole = "admin" | "user";

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: IRole;
}

export interface ILoginData {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
}

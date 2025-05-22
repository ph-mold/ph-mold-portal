export interface ILoginBody {
  email: string;
  password: string;
}

export type IRole = "admin" | "user";

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: IRole;
}

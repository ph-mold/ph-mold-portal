import { atom } from "recoil";
import { IUser } from "../lib/types/auth";

export const userState = atom<IUser | null>({
  key: "userState",
  default: null,
});

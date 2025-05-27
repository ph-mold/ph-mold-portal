import { ReactNode } from "react";
import { atom } from "recoil";

export interface HeaderOptions {
  title?: string;
  prevLink?: string;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
}

export const headerState = atom<HeaderOptions>({
  key: "headerState",
  default: {},
});

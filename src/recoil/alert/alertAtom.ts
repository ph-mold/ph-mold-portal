import { ReactNode } from "react";
import { atom } from "recoil";

export interface AlertState {
  description: string;
  acceptLabel?: string;
  cancelLabel?: string;
  onAccept?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  loading?: boolean;
  title?: ReactNode;
}

export const alertQueueState = atom<AlertState[]>({
  key: "alertQueueState",
  default: [],
});

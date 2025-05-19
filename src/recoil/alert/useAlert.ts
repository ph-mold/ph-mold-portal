import { useSetRecoilState } from "recoil";
import { alertQueueState, AlertState } from "./alertAtom";

export const useAlert = () => {
  const setQueue = useSetRecoilState(alertQueueState);

  return (config: AlertState) => {
    setQueue((prev) => [...prev, config]);
  };
};

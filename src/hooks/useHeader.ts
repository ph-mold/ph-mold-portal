import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { HeaderOptions, headerState } from "../recoil/headerAtom";

export function useHeader(options: HeaderOptions) {
  const setHeader = useSetRecoilState(headerState);

  useEffect(() => {
    setHeader(options);
    return () => setHeader({});
  }, [options]);
}

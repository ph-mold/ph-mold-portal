import useSWR from "swr";
import { GET_ME, getMe } from "../lib/api/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/authAtom";
import { useEffect } from "react";

export function useUser() {
  const { data, error, isLoading, isValidating } = useSWR(GET_ME, getMe, {
    revalidateOnFocus: false,
  });

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (isValidating) return;
    if (error) setUser(null);
    else setUser(data ?? null);
  }, [isLoading, isValidating, data, error, setUser]);

  return {
    user: data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: !!error,
  };
}

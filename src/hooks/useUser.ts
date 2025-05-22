import useSWR from "swr";
import { GET_ME, getMe } from "../lib/api/auth";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(GET_ME, getMe);

  return {
    user: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}

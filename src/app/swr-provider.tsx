"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "../lib/fetcher";

interface SWRProviderProps {
  children: ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false, // 포커스 시 자동 갱신 비활성화
        revalidateOnReconnect: false, // 네트워크 재연결 시 자동 갱신 비활성화
        refreshInterval: 0, // 자동 갱신 주기 0 (비활성화)
        shouldRetryOnError: false, // 에러 발생 시 재시도 비활성화 (선택 사항)
        revalidateIfStale: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

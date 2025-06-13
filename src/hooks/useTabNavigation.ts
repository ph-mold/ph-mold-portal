"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

interface TabType {
  label: string;
  value: string;
}

interface UseTabNavigationProps {
  tabs?: TabType[];
  defaultTab?: string;
  queryKey?: string; // query 모드에서 사용되는 쿼리 키
  mode?: "query" | "path" | "state"; // ✅ 동작 방식 선택
  basePath?: string;
  syncParams?: string[]; // query 모드에서 유지할 파라미터 목록
  removeParams?: string[]; // 제거할 파라미터
  onTabChange?: (tab: string) => void;
}

/**
 * 탭 네비게이션 훅 (query, path, state 모드 지원)
 */
export const useTabNavigation = ({
  tabs = [],
  defaultTab = tabs[0]?.value,
  queryKey = "tab",
  mode = "path",
  basePath = "",
  syncParams = [],
  removeParams = [],
  onTabChange,
}: UseTabNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    let currentTab: string;
    const searchParams = new URLSearchParams(location.search);

    if (mode === "query") {
      currentTab = searchParams.get(queryKey) ?? defaultTab;
    } else if (mode === "path") {
      const path = location.pathname.replace(basePath ?? "", "");
      const currentSegment = path.split("/").filter(Boolean)[0];
      currentTab =
        tabs.find((tab) => tab.value === currentSegment)?.value ?? defaultTab;
    } else {
      // state 모드
      currentTab = activeTab;
    }

    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
      onTabChange?.(currentTab);
    }
  }, [
    location,
    defaultTab,
    queryKey,
    mode,
    activeTab,
    tabs,
    basePath,
    onTabChange,
  ]);

  const handleTabClick = useCallback(
    (tab: string) => {
      if (activeTab === tab) return;

      if (mode === "query") {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(queryKey, tab);

        removeParams.forEach((key) => {
          searchParams.delete(key);
        });

        syncParams.forEach((key) => {
          const value = searchParams.get(key);
          if (value) searchParams.set(key, value);
        });

        navigate(`${location.pathname}?${searchParams.toString()}`);
      } else if (mode === "path") {
        const newPath = `${basePath && basePath + "/"}${tab}`;
        navigate(newPath);
      } else {
        // state 모드
        setActiveTab(tab);
        onTabChange?.(tab);
      }
    },
    [
      activeTab,
      mode,
      location,
      navigate,
      queryKey,
      syncParams,
      removeParams,
      basePath,
      onTabChange,
    ]
  );

  return { activeTab, handleTabClick };
};

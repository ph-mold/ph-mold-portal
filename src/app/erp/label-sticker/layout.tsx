import { Button } from "@ph-mold/ph-ui";
import { useTabNavigation } from "../../../hooks/useTabNavigation";
import { useHeader } from "../../../hooks/useHeader";
import { Outlet } from "react-router-dom";

export default function LabelStickerLayout() {
  useHeader({
    title: "라벨 스티커 생성",
    prevLink: "/erp",
  });

  const tabItems = [
    { label: "LS-3510", value: "ls-3510" },
    { label: "LS-3509", value: "ls-3509", disabled: true },
  ];

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: tabItems,
    mode: "path",
    basePath: "/erp/label-sticker",
  });

  return (
    <div className="flex h-full gap-6">
      {/* 왼쪽 탭 네비게이션 */}
      <div className="flex flex-col gap-2 min-w-[200px] p-4  border-r border-background2 shadow-sm">
        {tabItems.map((tab) => (
          <Button
            key={tab.value}
            color={activeTab === tab.value ? "primary" : "secondary"}
            variant="text"
            onClick={() => handleTabClick(tab.value)}
            className="w-full justify-start"
            disabled={tab.disabled}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* 오른쪽 컨텐츠 영역 */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

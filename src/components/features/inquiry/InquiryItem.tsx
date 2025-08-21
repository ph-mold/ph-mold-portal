import { IInquiry } from "@/lib/types/inquiry";
import { User, Building, Calendar } from "lucide-react";
import { useState } from "react";
import { STATUS_MAP } from ".";
import { Card } from "@/components/common/Card";

interface Props {
  item: IInquiry;
  onClick: (item: IInquiry) => void;
}

export function InquiryItem({ item, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const status = STATUS_MAP[item.status];

  return (
    <Card
      padding
      basic
      className={`group relative cursor-pointer hover:shadow-md ${
        item.status === "COMPLETED"
          ? "border-green-200 bg-green-50"
          : "bg-background border-border-strong"
      }`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 컨텐츠 */}
      <div className="flex items-start justify-between gap-3">
        {/* 왼쪽 컨텐츠 영역 */}
        <div className="min-w-0 flex-1">
          {/* 회사명과 신청자명 */}
          <div className="mb-3 flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base leading-tight font-semibold text-gray-900">
                {item.company}
              </h3>
            </div>
          </div>

          {/* 요청자 정보와 날짜 */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-600 sm:flex-nowrap">
            <div className="flex items-center gap-1.5">
              <User size={14} className="flex-shrink-0 text-gray-400" />
              <span className="truncate">{item.name}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <Building size={14} className="flex-shrink-0 text-gray-400" />
              <span className="truncate">{item.company}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar size={14} className="flex-shrink-0 text-gray-400" />
              <span className="truncate">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="truncate">연락처: {item.phone}</span>
          </div>
        </div>

        {/* 오른쪽 상태 및 버튼 영역 */}
        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.color} ${status.borderColor} border`}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Hover 오버레이 - 더보기 버튼에 마우스가 없을 때만 표시 */}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 z-9 flex items-center justify-center rounded-lg bg-blue-500/8 backdrop-blur-[2px] transition-all duration-200">
          <div className="rounded-lg border !border-blue-200 bg-blue-50/90 px-4 py-2 text-blue-700 shadow-sm backdrop-blur-md">
            <span className="text-sm font-medium tracking-wide">
              문의 상세 보기
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}

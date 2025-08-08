import { formatKoreanDateTime } from "@/utils/format";
import { User, Building, Calendar } from "lucide-react";
import { useState } from "react";
import { ISampleRequest, isStatusCompleted } from "@/lib/types/sample-request";
import { SampleRequestTimeline } from "./SampleRequestTimeline";

interface Props {
  item: ISampleRequest;
  onClick: (item: ISampleRequest) => void;
  onDelete?: (item: ISampleRequest) => void;
}

export function SampleRequestItem({ item, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative border  rounded-xl px-4 py-4 hover:shadow-md transition-all duration-200 cursor-pointer group ${
        isStatusCompleted(item.status, "completed")
          ? "bg-green-50 border-green-200"
          : "bg-background border-border-strong"
      }`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 컨텐츠 */}
      <div className="flex items-start justify-between gap-3">
        {/* 왼쪽 컨텐츠 영역 */}
        <div className="flex-1 min-w-0">
          {/* 제품명과 수량 */}
          <div className="flex items-start gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 truncate leading-tight">
                {item.product.name}
              </h3>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
              {item.quantity}개
            </span>
          </div>

          {/* 요청자 정보와 날짜 */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <Building size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{item.company}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {formatKoreanDateTime(item.createdAt.toString())}
              </span>
            </div>
          </div>

          {/* 타임라인 */}
          <div className="mt-3">
            <SampleRequestTimeline sampleRequest={item} />
          </div>
        </div>
      </div>

      {/* Hover 오버레이 - 더보기 버튼에 마우스가 없을 때만 표시 */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-500/8 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-9 pointer-events-none transition-all duration-200">
          <div className="bg-blue-50/90 text-blue-700 !border-blue-200 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border">
            <span className="text-sm font-medium tracking-wide">
              샘플 요청 상세 보기
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

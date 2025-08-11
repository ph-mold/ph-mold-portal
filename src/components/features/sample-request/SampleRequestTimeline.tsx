import { Check } from "lucide-react";
import {
  ISampleRequest,
  SampleRequestStatus,
  isStatusCompleted,
} from "@/lib/types/sample-request";
import { PROCESS_NODES } from "./detail/constants";

interface TimelineNodeProps {
  isCompleted: boolean;
  isActive: boolean;
  statusInfo: (typeof PROCESS_NODES)[0];
}

function TimelineNode({
  isCompleted,
  isActive,
  statusInfo,
}: TimelineNodeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* 노드 원형 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center shadow-sm justify-center transition-all duration-200 bg-gradient-to-r border-2 ${
          isCompleted
            ? `${statusInfo.activeColor} border-reverseForeground`
            : isActive
            ? `bg-background ${statusInfo.completedBorderColor}`
            : "bg-background border-border-strong text-gray-400"
        }`}
      >
        {isCompleted ? (
          <Check size={12} className={`text-reverseForeground`} />
        ) : isActive ? (
          <div className={`scale-75 ${statusInfo.completedTextColor}`}>
            {statusInfo.icon}
          </div>
        ) : (
          <div className="scale-75 text-gray-400">{statusInfo.icon}</div>
        )}
      </div>

      {/* 라벨 */}
      <span
        className={`text-xs mt-2 font-medium text-center max-w-16 leading-tight ${
          isCompleted
            ? `${statusInfo.completedTextColor} font-semibold`
            : isActive
            ? `${statusInfo.completedTextColor} font-semibold`
            : "text-gray-400"
        }`}
      >
        {statusInfo.label}
      </span>
    </div>
  );
}

interface SampleRequestTimelineProps {
  sampleRequest: ISampleRequest;
}

export function SampleRequestTimeline({
  sampleRequest,
}: SampleRequestTimelineProps) {
  const currentStatus = sampleRequest.status;
  const completedStatuses = currentStatus
    .split(",")
    .filter(Boolean) as SampleRequestStatus[];

  // 완료된 단계들의 인덱스를 찾아서 연결선 길이 계산
  const getProgressWidth = () => {
    if (completedStatuses.length === 0) return 0;
    if (completedStatuses.includes("completed")) return 100;

    // 마지막 완료된 단계의 인덱스 찾기
    let lastCompletedIndex = -1;
    for (let i = PROCESS_NODES.length - 1; i >= 0; i--) {
      if (completedStatuses.includes(PROCESS_NODES[i].id)) {
        lastCompletedIndex = i;
        break;
      }
    }

    if (lastCompletedIndex === -1) return 0;

    // 8등분 구조에 맞춰 진행률 계산
    // 각 노드는 2등분씩 차지하므로 8등분 중 2등분씩
    const segmentWidth = 100 / 8; // 12.5%씩
    const progress = (lastCompletedIndex + 1) * segmentWidth * 2; // 2등분씩이므로 *2
    return Math.min(progress, 100);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* 연결선 */}
        <div className="absolute top-3 left-0 right-0 h-1 bg-border-strong" />

        {/* 완료된 연결선 */}
        {completedStatuses.length > 0 && (
          <div
            className="absolute top-3 left-0 h-1 bg-signature transition-all duration-300"
            style={{
              width: `${getProgressWidth()}%`,
            }}
          />
        )}

        {/* 노드들 */}
        {PROCESS_NODES.map((statusInfo, index) => {
          const isCompleted = isStatusCompleted(currentStatus, statusInfo.id);

          // 현재 진행 중인 단계 계산
          let isActive = false;
          if (!isCompleted) {
            // 완료되지 않은 단계 중에서 첫 번째가 현재 진행 중
            const completedCount = completedStatuses.length;
            isActive = index === completedCount;
          }

          return (
            <div
              key={statusInfo.id}
              className="flex-1 flex justify-center relative z-2"
            >
              <TimelineNode
                isCompleted={isCompleted}
                isActive={isActive}
                statusInfo={statusInfo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

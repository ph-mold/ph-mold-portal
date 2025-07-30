import { Check, ChevronRight } from "lucide-react";
import { PROCESS_NODES } from "./constants";
import { ProcessNode } from ".";

interface ProcessTimelineProps {
  currentNode: ProcessNode;
  completedSteps?: ProcessNode[]; // 서버에서 받아올 완료된 단계들
  onNodeChange: (node: ProcessNode) => void;
}

export function ProcessTimeline({
  currentNode,
  completedSteps = [],
  onNodeChange,
}: ProcessTimelineProps) {
  return (
    <div className="bg-background shadow rounded-lg p-4 sm:!p-6 mb-2 border border-border-strong">
      <h2 className="text-lg font-semibold mb-4">샘플 요청 처리</h2>

      {/* 반응형 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-1">
        {PROCESS_NODES.map((node, index) => {
          const isCurrentNode = currentNode === node.id;
          const isCompleted = completedSteps.includes(node.id);

          let buttonClasses =
            "w-full p-3 md:p-4 rounded-lg transition-all duration-200 cursor-pointer ";
          let iconClasses =
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ";
          let textClasses = "";

          if (isCurrentNode) {
            // 현재 노드
            buttonClasses += `${node.activeColor} text-reverseForeground shadow-lg`;
            iconClasses += `bg-background ${node.completedTextColor}`;
            textClasses = "text-reverseForeground";
          } else if (isCompleted) {
            // 완료된 노드
            buttonClasses += `${node.completedColor} ${node.completedTextColor} hover:bg-opacity-80`;
            iconClasses += "bg-green-500 text-reverseForeground";
            textClasses = node.completedTextColor;
          } else {
            // 대기 중인 노드
            buttonClasses +=
              "bg-gray-50 md:bg-gray-100 text-gray-400 hover:bg-gray-100 md:hover:bg-gray-200";
            iconClasses += "bg-gray-300 text-gray-500";
            textClasses = "text-gray-400";
          }

          return (
            <button
              key={node.id}
              onClick={() => onNodeChange(node.id)}
              className={buttonClasses}
            >
              {/* 모바일: 좌측 정렬 */}
              <div className="flex items-center space-x-3 md:space-x-0 md:flex-col">
                <div className={iconClasses}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 md:flex-none md:text-center mt-1">
                  <div
                    className={`font-medium text-sm truncate md:truncate-none ${textClasses}`}
                  >
                    {node.label}
                  </div>
                  <div
                    className={`text-xs mt-1 opacity-75 line-clamp-1 md:line-clamp-none ${textClasses}`}
                  >
                    {node.description}
                  </div>
                </div>
                <div className="flex-shrink-0 md:hidden w-5">
                  {isCurrentNode && <ChevronRight className="w-5 h-5" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

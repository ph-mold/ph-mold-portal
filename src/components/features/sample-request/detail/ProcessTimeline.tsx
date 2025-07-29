import { Check } from "lucide-react";

export type ProcessNode = "reception" | "processing" | "shipped" | "completed";

interface ProcessTimelineProps {
  currentNode: ProcessNode;
  completedSteps?: ProcessNode[]; // 서버에서 받아올 완료된 단계들
  onNodeChange: (node: ProcessNode) => void;
}

const PROCESS_NODES = [
  {
    id: "reception" as ProcessNode,
    label: "요청 접수",
    description: "고객이 샘플 요청서를 제출",
    color: "bg-blue-500",
    activeColor: "bg-blue-600",
    completedColor: "bg-blue-100",
    completedTextColor: "text-blue-700",
  },
  {
    id: "processing" as ProcessNode,
    label: "준비 중",
    description: "관리자가 샘플 포장 및 준비",
    color: "bg-yellow-500",
    activeColor: "bg-yellow-600",
    completedColor: "bg-yellow-100",
    completedTextColor: "text-yellow-700",
  },
  {
    id: "shipped" as ProcessNode,
    label: "배송 중",
    description: "송장번호 등록 및 발송 완료",
    color: "bg-purple-500",
    activeColor: "bg-purple-600",
    completedColor: "bg-purple-100",
    completedTextColor: "text-purple-700",
  },
  {
    id: "completed" as ProcessNode,
    label: "완료",
    description: "고객 수령 완료",
    color: "bg-green-500",
    activeColor: "bg-green-600",
    completedColor: "bg-green-100",
    completedTextColor: "text-green-700",
  },
];

export function ProcessTimeline({
  currentNode,
  completedSteps = [],
  onNodeChange,
}: ProcessTimelineProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        샘플 요청 처리 프로세스
      </h2>

      {/* 반응형 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-1">
        {PROCESS_NODES.map((node, index) => {
          const isCurrentNode = currentNode === node.id;
          const isCompleted = completedSteps.includes(node.id);

          let buttonClasses =
            "w-full p-3 md:p-4 rounded-lg transition-all duration-200 border-2 ";
          let iconClasses =
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ";
          let textClasses = "";

          if (isCurrentNode) {
            // 현재 노드: 진한 색상 + 흰색 텍스트 + 그림자
            buttonClasses += `${node.activeColor} text-white shadow-lg border-${node.activeColor}`;
            iconClasses += `bg-white ${node.completedTextColor}`;
            textClasses = "text-white";
          } else if (isCompleted) {
            // 완료된 노드: 연한 배경 + 진한 텍스트 + 체크마크
            buttonClasses += `${node.completedColor} ${node.completedTextColor} border-${node.completedColor} hover:bg-opacity-80`;
            iconClasses += "bg-green-500 text-white";
            textClasses = node.completedTextColor;
          } else {
            // 대기 중인 노드: 회색 배경 + 회색 텍스트
            buttonClasses +=
              "bg-gray-50 md:bg-gray-100 text-gray-400 border-gray-200 md:border-gray-100 hover:bg-gray-100 md:hover:bg-gray-200";
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
                  ) : isCurrentNode ? (
                    <span className="text-sm font-bold">●</span>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 md:flex-none md:text-center">
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
                {isCurrentNode && (
                  <div className="flex-shrink-0 md:hidden">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

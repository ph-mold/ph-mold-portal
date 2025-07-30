import { ProcessNode } from ".";

export const PROCESS_NODES = [
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

import { Check, Package, Truck, UserCheck } from "lucide-react";
import { ProcessNode } from ".";

export const PROCESS_NODE_VALUES = [
  "reception",
  "processing",
  "shipped",
  "completed",
] as const;

export const PROCESS_NODES = [
  {
    id: "reception" as ProcessNode,
    label: "요청 접수",
    description: "고객이 샘플 요청서를 제출",
    color: "bg-blue-500",
    activeColor: "bg-gradient-primary",
    completedColor: "bg-blue-100",
    completedTextColor: "text-blue-400",
    completedBorderColor: "border-blue-400",
    icon: <UserCheck size={16} />,
  },
  {
    id: "processing" as ProcessNode,
    label: "준비 중",
    description: "관리자가 샘플 포장 및 준비",
    color: "bg-yellow-500",
    activeColor: "bg-gradient-quinary",
    completedColor: "bg-yellow-100",
    completedTextColor: "text-yellow-400",
    completedBorderColor: "border-yellow-400",
    icon: <Package size={16} />,
  },
  {
    id: "shipped" as ProcessNode,
    label: "배송 중",
    description: "송장번호 등록 및 발송 완료",
    color: "bg-purple-500",
    activeColor: "bg-gradient-secondary",
    completedColor: "bg-purple-100",
    completedTextColor: "text-purple-400",
    completedBorderColor: "border-purple-400",
    icon: <Truck size={16} />,
  },
  {
    id: "completed" as ProcessNode,
    label: "완료",
    description: "고객 수령 완료",
    color: "bg-green-500",
    activeColor: "bg-gradient-quaternary",
    completedColor: "bg-green-100",
    completedTextColor: "text-green-400",
    completedBorderColor: "border-green-400",
    icon: <Check size={16} />,
  },
];

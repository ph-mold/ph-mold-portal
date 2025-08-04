import {
  GET_SAMPLE_REQUEST,
  updateReceptionNode,
} from "@/lib/api/sample-request";
import { ISampleRequest } from "../../../../lib/types/sample-request";
import {
  ProductCard,
  SummaryCard,
  ContactCard,
  AddressCard,
  RemarksCard,
} from "./RequestReception";
import { mutate } from "swr";
import { useAlert } from "@ph-mold/ph-ui";
import { useNavigate } from "react-router-dom";

interface RequestReceptionNodeProps {
  request: ISampleRequest;
}

export function RequestReceptionNode({ request }: RequestReceptionNodeProps) {
  const alert = useAlert();
  const navigate = useNavigate();

  const handleUpdateReceptionNode = async () => {
    const res = await updateReceptionNode(request.id);
    if (res) {
      mutate([GET_SAMPLE_REQUEST, request.id.toString()]);
      alert({
        title: "요청 접수",
        description: "요청 접수가 완료되었습니다.",
        acceptLabel: "확인",
        onAccept: () => {
          navigate(`/erp/sample-requests/${request.id}?n=processing`);
        },
      });
    }
  };

  const handleCompleteReceptionNode = async () => {
    alert({
      title: "요청 접수",
      description: "요청 접수하시겠습니까?",
      acceptLabel: "완료",
      onAccept: () => {
        handleUpdateReceptionNode();
      },
    });
  };

  return (
    <div className="bg-background rounded-lg shadow-sm border border-border-strong">
      {/* 제품 정보 */}
      <ProductCard
        req={request}
        onUpdateReceptionNode={handleCompleteReceptionNode}
      />

      {/* 요청 요약 */}
      <SummaryCard req={request} />

      {/* 연락처 정보 */}
      <ContactCard req={request} />

      {/* 배송지 정보 */}
      <AddressCard req={request} />

      {/* 비고 */}
      <RemarksCard req={request} />
    </div>
  );
}

import { ISampleRequest } from "../../../../lib/types/sample-request";
import {
  ProductCard,
  SummaryCard,
  ContactCard,
  AddressCard,
  RemarksCard,
} from "./RequestReception";

interface RequestReceptionNodeProps {
  request: ISampleRequest;
}

export function RequestReceptionNode({ request }: RequestReceptionNodeProps) {
  return (
    <div className="space-y-3">
      {/* 제품 정보 */}
      <ProductCard req={request} />

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

import { useParams } from "react-router-dom";
import { useHeader } from "../../../../hooks/useHeader";
import { ISampleRequest } from "../../../../lib/types/sample-request";
import useSWR from "swr";
import {
  GET_SAMPLE_REQUEST,
  getSampleRequest,
} from "../../../../lib/api/sample-request";
import {
  ProductCard,
  SummaryCard,
  ContactCard,
  AddressCard,
  RemarksCard,
} from "@/components/features/sample-request/detail";

export default function SampleRequestDetailPage() {
  const { requestId } = useParams<{ requestId: string }>();

  const { data: request } = useSWR<ISampleRequest | undefined>(
    requestId ? [GET_SAMPLE_REQUEST, requestId] : null,
    () => getSampleRequest(requestId)
  );

  /* 헤더 설정 */
  useHeader({
    title: "샘플 요청 상세",
    prevLink: "/erp/sample-requests",
  });

  return (
    <>
      {request && (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 space-y-3">
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
        </div>
      )}
    </>
  );
}

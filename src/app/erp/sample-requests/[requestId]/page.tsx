import { useParams } from "react-router-dom";
import { useHeader } from "../../../../hooks/useHeader";
import { Button, Input } from "@ph-mold/ph-ui";
import { formatCount, formatKoreanDateTime } from "../../../../utils/format";
import { ISampleRequest } from "../../../../lib/types/sample-request";
import { IMAGE_BASE_URL } from "../../../../lib/constants/api";
import useSWR from "swr";
import {
  GET_SAMPLE_REQUEST,
  getSampleRequest,
} from "../../../../lib/api/sample-request";

function ProductCard({ req }: { req: ISampleRequest }) {
  const prod = req.product;

  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-signature">
      <h2 className="text-lg font-semibold mb-4">제품 정보</h2>

      <div className="flex gap-4 items-start">
        {/* 썸네일 */}
        <img
          src={`${IMAGE_BASE_URL}${prod.thumbnailImageUrl}`}
          alt={`thumb-${prod.code}`}
          className="size-40 object-contain rounded-lg border shadow-sm"
        />

        {/* 텍스트 (2-col grid, 1열 fit) */}
        <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm flex-1">
          <span className="text-foreground2">코드</span>
          <span>{prod.code}</span>

          <span className="text-foreground2">이름</span>
          <span className="font-medium">{prod.name}</span>

          <span className="text-foreground2">분류</span>
          <span>
            {prod.mainCategory}
            {prod.subCategory && ` / ${prod.subCategory}`}
          </span>

          <span className="text-foreground2">재질</span>
          <span>{prod.material}</span>

          <span className="text-foreground2">MOQ</span>
          <span>{formatCount(prod.moq ?? 0)} 개</span>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ req }: { req: ISampleRequest }) {
  return (
    <section className="bg-background rounded-xl p-6 shadow-sm border border-signature">
      <h2 className="text-lg font-semibold mb-4">요청 요약</h2>

      <div className="space-y-3">
        <Input label="신청자" readOnly value={req.name} />
        <Input label="회사" readOnly value={req.company} />
        <Input label="요청 수량" readOnly value={formatCount(req.quantity)} />
      </div>

      <p className="text-sm text-foreground2 mt-6">
        요청일 / 시간&nbsp;:&nbsp;
        {formatKoreanDateTime(req.createdAt.toString())}
      </p>
    </section>
  );
}

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
    rightSlot: (
      <div className="flex gap-2 mr-2">
        <Button size="small">승인</Button>
        <Button color="error" variant="outlined" size="small">
          거절
        </Button>
      </div>
    ),
  });

  return (
    <>
      {request && (
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="mx-auto w-full max-w-[1080px] px-4 md:px-10 my-4 mb-10 grid md:grid-cols-5 gap-3">
            {/* 좌측 두 열 : 제품 + 요약 */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <ProductCard req={request} />
              <SummaryCard req={request} />
            </div>

            {/* 우측 상세 */}
            <div className="md:col-span-3 space-y-2">
              {/* 연락처 */}
              <section className="rounded-xl p-6 shadow-sm border border-signature">
                <h3 className="text-lg font-semibold mb-3">연락처</h3>
                <div className="space-y-3">
                  <Input label="E-mail" readOnly value={request.email} />
                  <Input label="전화번호" readOnly value={request.phone} />
                </div>
              </section>

              {/* 배송지 */}
              <section className="rounded-xl p-6 shadow-sm border border-signature">
                <h3 className="text-lg font-semibold mb-3">배송지</h3>
                <div className="space-y-3">
                  <Input label="주소" readOnly value={request.address} />
                  {request.detailedAddress && (
                    <Input
                      label="상세"
                      readOnly
                      value={request.detailedAddress}
                    />
                  )}
                </div>
              </section>

              {/* 비고 */}
              {request.remarks && (
                <section className="rounded-xl p-6 shadow-sm border border-signature">
                  <h3 className="text-lg font-semibold mb-3">비고</h3>
                  <p className="whitespace-pre-line">{request.remarks}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { Button, Input } from "@ph-mold/ph-ui";

export function ShippedNode() {
  return (
    <div className="space-y-4 bg-background rounded-lg shadow-sm border border-border-strong">
      <div className="p-4 sm:!p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">배송 중</h3>

        {/* 송장번호 입력 */}
        <div className="flex flex-col gap-4 mb-4">
          <Input label="송장번호" placeholder="송장번호를 입력하세요" />
          <Input
            label="배송일자"
            placeholder="배송일자를 입력하세요"
            type="date"
          />
          <Input
            label="배송 추적 링크"
            placeholder="배송 추적 링크를 입력하세요"
            readOnly
          />
        </div>

        {/* 상태 변경 버튼 */}
        <div className="flex justify-end space-x-2">
          <Button variant="outlined">이전 단계로</Button>
          <Button>배송 완료</Button>
        </div>
      </div>
    </div>
  );
}

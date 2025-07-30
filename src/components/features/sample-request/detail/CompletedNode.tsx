import { Button, Input, TextArea } from "@ph-mold/ph-ui";

export function CompletedNode() {
  return (
    <div className="space-y-4 bg-background rounded-lg shadow-sm border border-border-strong">
      <div className="p-4 sm:!p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">완료</h3>
        <div className="flex flex-col gap-4 mb-4">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 ring-signature" />
            <span className="ml-2 text-sm font-medium text-foreground">
              고객이 샘플을 수령했습니다
            </span>
          </label>
          <Input label="수령일자" type="date" />
          <TextArea
            label="후속 메모"
            rows={4}
            placeholder="고객 피드백이나 후속 조치 사항을 기록하세요"
          />
        </div>
        {/* 완료 상태 표시
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                샘플 요청이 성공적으로 완료되었습니다
              </p>
            </div>
          </div>
        </div> */}
        <div className="flex justify-end space-x-2">
          <Button variant="outlined">이전 단계로</Button>
          <Button>완료</Button>
        </div>
      </div>
    </div>
  );
}

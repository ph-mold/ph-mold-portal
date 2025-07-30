import { Button, Input, TextArea } from "@ph-mold/ph-ui";
import { useUser } from "@/hooks/useUser";

export function ProcessingNode() {
  const { user } = useUser();

  return (
    <div className="space-y-4 bg-background rounded-lg shadow-sm border border-border-strong">
      <div className="p-4 sm:!p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">준비 중</h3>

        <div className="flex flex-col gap-4 mb-4">
          <Input label="담당자" readOnly value={user?.name ?? ""} />
          <TextArea
            label="내부 메모"
            placeholder="작업 진행 상황을 기록하세요"
            rows={4}
          />
          <div>
            <label className="block text-sm font-medium text-foreground2 mb-1">
              첨부 이미지
            </label>
            <div className="border-2 border-dashed border-border-strong rounded-md p-6 text-center">
              <div className="text-foreground2">
                <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
                <p className="text-sm">
                  포장 과정, 준비 상황 등을 사진으로 기록할 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outlined">이전 단계로</Button>
          <Button>준비 완료</Button>
        </div>
      </div>
    </div>
  );
}

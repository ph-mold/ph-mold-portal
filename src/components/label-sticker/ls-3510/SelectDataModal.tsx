import { Button, Modal } from "@ph-mold/ph-ui";
import { LabelData } from "../../../lib/types/label-sticker";
import { clsx } from "clsx";

interface SelectDataModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (data: LabelData) => void;
  onClear: () => void;
  addedData: LabelData[];
  selectedData?: LabelData;
}

export function SelectDataModal({
  open,
  onClose,
  onSelect,
  onClear,
  addedData,
  selectedData,
}: SelectDataModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="데이터 선택">
      <div className="space-y-4">
        {addedData.length > 0 ? (
          addedData.map((data, index) => {
            const isSelected =
              selectedData &&
              JSON.stringify(selectedData) === JSON.stringify(data);

            return (
              <div
                key={index}
                onClick={() => onSelect(data)}
                className={clsx(
                  "p-4 border-2 rounded-lg cursor-pointer transition-colors hover:border-signature border-border-light",
                  { "border-border-strong ": isSelected }
                )}
                style={{
                  backgroundColor: data.backgroundColor,
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {data.value1 && (
                      <div className="font-medium text-lg">{data.value1}</div>
                    )}
                    {data.value2 && (
                      <>
                        <div className="text-sm">|</div>
                        <div className="text-sm">{data.value2}</div>
                      </>
                    )}
                    {isSelected && (
                      <div className="ml-auto px-2 py-0.5 text-foreground text-xs rounded">
                        선택됨
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    {data.value3 && <div>코드: {data.value3}</div>}
                    {data.value4 && <div>수량: {data.value4}</div>}
                    {data.value5 && <div>중량: {data.value5}</div>}
                    {data.value6 && <div>납품일: {data.value6}</div>}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-8">
            추가된 데이터가 없습니다
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outlined" color="error" onClick={onClear}>
            비우기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

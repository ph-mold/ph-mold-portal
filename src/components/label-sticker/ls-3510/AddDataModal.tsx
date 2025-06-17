import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { LabelData, LABEL_COLORS } from "../../../lib/types/label-sticker";

interface AddDataModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: LabelData) => void;
  data: LabelData;
  onChange: (data: LabelData) => void;
}

export function AddDataModal({
  open,
  onClose,
  onAdd,
  data,
  onChange,
}: AddDataModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="라벨 데이터 추가">
      <div className="space-y-4">
        <Input
          label="입고처"
          value={data.value1}
          onChange={(e) => onChange({ ...data, value1: e.target.value })}
        />
        <Input
          label="품명"
          value={data.value2}
          onChange={(e) => onChange({ ...data, value2: e.target.value })}
        />
        <Input
          label="코드"
          value={data.value3}
          onChange={(e) => onChange({ ...data, value3: e.target.value })}
        />
        <Input
          label="수량"
          value={data.value4}
          onChange={(e) => onChange({ ...data, value4: e.target.value })}
        />
        <Input
          label="중량"
          value={data.value5}
          onChange={(e) => onChange({ ...data, value5: e.target.value })}
        />
        <Input
          label="납품일"
          type="date"
          value={data.value6}
          onChange={(e) => onChange({ ...data, value6: e.target.value })}
        />
        <div>
          <div className="mb-2">배경색</div>
          <div className="flex gap-4 flex-wrap">
            {LABEL_COLORS.map((color) => (
              <label
                key={color.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="backgroundColor"
                  value={color.value}
                  checked={data.backgroundColor === color.value}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      backgroundColor: e.target.value,
                    })
                  }
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    data.backgroundColor === color.value
                      ? "border-border-strong"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
                <span>{color.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="text" onClick={onClose}>
            취소
          </Button>
          <Button onClick={() => onAdd(data)}>추가</Button>
        </div>
      </div>
    </Modal>
  );
}

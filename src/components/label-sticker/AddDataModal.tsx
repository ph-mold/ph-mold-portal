import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { LabelData } from "../../lib/types/label-sticker";
import { LABEL_TYPE_CONFIGS, LABEL_COLORS } from "./constants";

interface AddDataModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: LabelData) => void;
  data: LabelData;
  onChange: (data: LabelData) => void;
  labelType: "ls-3509" | "ls-3510";
}

export function AddDataModal({
  open,
  onClose,
  onAdd,
  data,
  onChange,
  labelType,
}: AddDataModalProps) {
  const config = LABEL_TYPE_CONFIGS[labelType];

  const renderInputs = () => {
    const inputs = [];

    for (let i = 1; i <= config.valueCount; i++) {
      const key = `value${i}` as keyof LabelData;
      const title = config.titles[key];
      const value = data[key] as string;
      const isDateField = labelType === "ls-3510" && i === 6;

      inputs.push(
        <Input
          key={key}
          label={title}
          type={isDateField ? "date" : "text"}
          value={value}
          onChange={(e) => onChange({ ...data, [key]: e.target.value })}
        />
      );
    }

    return inputs;
  };

  return (
    <Modal open={open} onClose={onClose} title="라벨 데이터 추가">
      <div className="space-y-4">
        {renderInputs()}
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

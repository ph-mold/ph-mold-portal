import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { LabelData, LabelType } from "../../../lib/types/label-sticker";
import { LABEL_TYPE_CONFIGS, LABEL_COLORS } from "./constants";
import { Form, Formik } from "formik";
import { createInitialData } from "./utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: LabelData) => void;
  labelType: LabelType;
}

export function AddDataModal({ open, onClose, onAdd, labelType }: Props) {
  const config = LABEL_TYPE_CONFIGS[labelType];
  const data = createInitialData(labelType);

  const renderInputs = ({
    values,
    handleChange,
  }: {
    values: LabelData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const inputs = [];

    for (let i = 1; i <= config.valueCount; i++) {
      const key = `value${i}` as keyof LabelData;
      const title = config.titles[key];
      const isDateField = labelType === "ls-3510" && i === 6;

      inputs.push(
        <Input
          key={key}
          name={key}
          label={title}
          type={isDateField ? "date" : "text"}
          value={values[key]}
          onChange={handleChange}
        />
      );
    }

    return inputs;
  };

  return (
    <Modal open={open} onClose={onClose} title="라벨 데이터 추가">
      <Formik<LabelData>
        initialValues={{
          ...data,
          backgroundColor: data.backgroundColor,
        }}
        onSubmit={(values) => {
          onAdd(values);
          onClose();
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <Form className="space-y-4">
            {renderInputs({ values, handleChange })}
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
                      checked={values.backgroundColor === color.value}
                      onChange={(e) =>
                        setFieldValue("backgroundColor", e.target.value)
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        values.backgroundColor === color.value
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
              <Button onClick={() => handleSubmit()}>추가</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

import { LABEL_TYPES } from "@/lib/types/label-sticker";
import {
  LabelTypeButton,
  LabelTypeIcon,
} from "@/components/features/label-sticker";

interface Props {
  onLabelTypeClick: (labelType: string) => void;
}

export function LabelTypeSelector({ onLabelTypeClick }: Props) {
  return (
    <div className="flex justify-center gap-6">
      <LabelTypeButton
        labelType={LABEL_TYPES.LS_3510}
        onClick={onLabelTypeClick}
        color="blue"
      >
        <LabelTypeIcon labelType={LABEL_TYPES.LS_3510} />
      </LabelTypeButton>

      <LabelTypeButton
        labelType={LABEL_TYPES.LS_3509}
        onClick={onLabelTypeClick}
        color="green"
      >
        <LabelTypeIcon labelType={LABEL_TYPES.LS_3509} />
      </LabelTypeButton>
    </div>
  );
}

import { LabelData, LABEL_TYPES } from "../../../lib/types/label-sticker";
import { LabelGrid as CommonLabelGrid } from "../LabelGrid";
import { LabelCard } from "./LabelCard";

interface LabelGridProps {
  data: Partial<LabelData>[];
  onCardClick: (index: number) => void;
}

export function LabelGrid({ data, onCardClick }: LabelGridProps) {
  return (
    <CommonLabelGrid
      data={data}
      labelType={LABEL_TYPES.LS_3510}
      onCardClick={onCardClick}
      LabelCardComponent={LabelCard}
    />
  );
}

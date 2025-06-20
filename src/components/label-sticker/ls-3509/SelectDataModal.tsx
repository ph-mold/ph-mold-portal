import { LabelData, LABEL_TYPES } from "../../../lib/types/label-sticker";
import { SelectDataModal as CommonSelectDataModal } from "../SelectDataModal";

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
    <CommonSelectDataModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      onClear={onClear}
      addedData={addedData}
      selectedData={selectedData}
      labelType={LABEL_TYPES.LS_3509}
    />
  );
}

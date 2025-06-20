import { LabelData } from "../../../lib/types/label-sticker";
import { AddDataModal as CommonAddDataModal } from "../AddDataModal";

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
    <CommonAddDataModal
      open={open}
      onClose={onClose}
      onAdd={onAdd}
      data={data}
      onChange={onChange}
      labelType="ls-3509"
    />
  );
}

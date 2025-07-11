import { Modal } from "@ph-mold/ph-ui";
import { PlusSquare } from "lucide-react";
import useSWR from "swr";
import { GET_SPEC_TYPES, getSpecTypes } from "@/lib/api/spec-types";
import { ISpecType } from "@/lib/types/spec";
import { SpecTypesTable } from "@/components/features/spec";

interface Props {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  addSpecTypeAction?: (spec: ISpecType) => void;
}

export function AddSpecModal({ open, setOpen, addSpecTypeAction }: Props) {
  const { data } = useSWR<ISpecType[]>([GET_SPEC_TYPES], getSpecTypes);

  const handleOnDoubleClick = (spec: ISpecType) => {
    addSpecTypeAction?.(spec);
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      title={
        <div className="text-signature flex items-center gap-1">
          <PlusSquare />
          스펙 추가
        </div>
      }
      bodyClassName="!p-0 !overflow-y-hidden mb-3"
      className="!min-w-[520px]"
    >
      <div className="overflow-y-hidden h-[480px]">
        <SpecTypesTable data={data} onDoubleClick={handleOnDoubleClick} />
      </div>
    </Modal>
  );
}

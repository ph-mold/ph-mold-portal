import {
  createSpecType,
  deleteSpecType,
  GET_SPEC_TYPES_PAGINATED,
  updateSpecType,
} from "@/lib/api/spec-types";
import { ISpecType } from "@/lib/types/spec";
import { useAlert } from "@ph-mold/ph-ui";
import { useState } from "react";
import { mutate } from "swr";

export function useSpecManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<ISpecType | null>(null);
  const alert = useAlert();

  const handleModalOpen = (spec?: ISpecType) => {
    if (spec) {
      setEditingSpec(spec);
    } else {
      setEditingSpec(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSpec(null);
  };

  const handleSubmit = async (specType: ISpecType) => {
    try {
      if (editingSpec) {
        await updateSpecType(specType);
        alert({
          description: "스펙이 수정되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      } else {
        await createSpecType(specType);
        alert({
          description: "스펙이 생성되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      }
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_SPEC_TYPES_PAGINATED,
        undefined
      );
      handleModalClose();
    } catch {
      alert({
        description: editingSpec
          ? "스펙 수정에 실패했습니다."
          : "스펙 생성에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  const handleDelete = async (specType: ISpecType) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      alert({
        description: "정말 삭제하시겠습니까?",
        acceptLabel: "삭제",
        onAccept: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
    if (!confirmed) return;

    try {
      await deleteSpecType(specType.id);
      alert({
        description: "스펙이 삭제되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_SPEC_TYPES_PAGINATED,
        undefined
      );
    } catch {
      alert({
        description: "스펙 삭제에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  return {
    isModalOpen,
    editingSpec,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleDelete,
  };
}

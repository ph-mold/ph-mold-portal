import {
  createTag,
  deleteTag,
  GET_TAGS_PAGINATED,
  updateTag,
} from "@/lib/api/tags";
import { ITag } from "@/lib/types/tag";
import { useAlert } from "@ph-mold/ph-ui";
import { AxiosError } from "axios";
import { useState } from "react";
import { mutate } from "swr";

export function useTagManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<ITag | null>(null);

  const alert = useAlert();

  const handleModalOpen = (tag?: ITag) => {
    if (tag) {
      setEditingTag(tag);
    } else {
      setEditingTag(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTag(null);
  };

  const handleSubmit = async (tag: ITag) => {
    try {
      if (editingTag) {
        await updateTag(tag);
        alert({
          description: "태그가 수정되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      } else {
        await createTag(tag);
        alert({
          description: "태그가 생성되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      }
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_TAGS_PAGINATED,
        undefined
      );
      handleModalClose();
    } catch (error: unknown) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        (editingTag
          ? "태그 수정에 실패했습니다."
          : "태그 생성에 실패했습니다.");

      alert({
        description: errorMessage,
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  const handleDelete = async (tag: ITag) => {
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
      await deleteTag(tag.id);
      alert({
        description: "태그가 삭제되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_TAGS_PAGINATED,
        undefined
      );
    } catch {
      alert({
        description: "태그 삭제에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };
  return {
    isModalOpen,
    editingTag,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleDelete,
  };
}

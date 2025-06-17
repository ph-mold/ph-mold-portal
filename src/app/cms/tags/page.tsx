import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  GET_TAGS,
} from "../../../lib/api/tags";
import { Button, useAlert } from "@ph-mold/ph-ui";
import { ITag } from "../../../lib/types/tag";
import { useHeader } from "../../../hooks/useHeader";
import TagsTable from "../../../components/domain/table/TagsTable";
import TagFormModal from "../../../components/domain/modal/TagFormModal";
import { Plus } from "lucide-react";

export default function TagsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<ITag | null>(null);
  const alert = useAlert();

  const { data: tags, isLoading } = useSWR<ITag[]>([GET_TAGS], getTags);

  useHeader({
    title: "태그 관리",
    prevLink: "/cms",
    rightSlot: (
      <Button
        variant="outlined"
        className="mx-2"
        size="small"
        startIcon={<Plus size={16} />}
        onClick={() => handleModalOpen()}
      >
        태그 추가
      </Button>
    ),
  });

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

  const handleSubmit = async (formData: { name: string; key: string }) => {
    try {
      if (editingTag) {
        await updateTag(editingTag.id, formData);
        alert({
          description: "태그가 수정되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      } else {
        await createTag(formData);
        alert({
          description: "태그가 생성되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      }
      mutate([GET_TAGS]);
      handleModalClose();
    } catch {
      alert({
        description: editingTag
          ? "태그 수정에 실패했습니다."
          : "태그 생성에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  const handleDelete = async (tag: ITag) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      alert({
        description: "정말 삭제하시겠습니까?",
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
      mutate([GET_TAGS]);
    } catch {
      alert({
        description: "태그 삭제에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {!isLoading && tags && (
        <TagsTable
          data={tags}
          onEdit={handleModalOpen}
          onDelete={handleDelete}
          showActions
        />
      )}

      <TagFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        editingTag={editingTag ?? undefined}
      />
    </div>
  );
}

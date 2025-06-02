import { Modal, Input, Button } from "@ph-mold/ph-ui";
import { ITag } from "../../../lib/types/tag";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; key: string }) => void;
  editingTag?: ITag;
}

export default function TagFormModal({
  open,
  onClose,
  onSubmit,
  editingTag,
}: Props) {
  const [formData, setFormData] = useState({ name: "", key: "" });

  useEffect(() => {
    if (editingTag) {
      setFormData({ name: editingTag.name, key: editingTag.key });
    } else {
      setFormData({ name: "", key: "" });
    }
  }, [editingTag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      title={editingTag ? "태그 수정" : "태그 추가"}
      open={open}
      onClose={onClose}
      bodyClassName="!p-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">키</label>
          <Input
            value={formData.key}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, key: e.target.value }))
            }
            required
            placeholder="키를 입력해주세요"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="text" onClick={onClose}>
            취소
          </Button>
          <Button type="submit">{editingTag ? "수정" : "추가"}</Button>
        </div>
      </form>
    </Modal>
  );
}

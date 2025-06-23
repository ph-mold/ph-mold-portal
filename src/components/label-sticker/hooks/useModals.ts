import { useState } from "react";

export function useModals() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isBulkApplyModalOpen, setIsBulkApplyModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openSelectModal = () => setIsSelectModalOpen(true);
  const closeSelectModal = () => setIsSelectModalOpen(false);
  const openBulkApplyModal = () => setIsBulkApplyModalOpen(true);
  const closeBulkApplyModal = () => setIsBulkApplyModalOpen(false);

  return {
    isAddModalOpen,
    isSelectModalOpen,
    isBulkApplyModalOpen,
    openAddModal,
    closeAddModal,
    openSelectModal,
    closeSelectModal,
    openBulkApplyModal,
    closeBulkApplyModal,
  };
}

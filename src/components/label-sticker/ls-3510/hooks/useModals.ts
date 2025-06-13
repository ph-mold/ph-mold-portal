import { useState } from "react";

export function useModals() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openSelectModal = () => setIsSelectModalOpen(true);
  const closeSelectModal = () => setIsSelectModalOpen(false);

  return {
    isAddModalOpen,
    isSelectModalOpen,
    openAddModal,
    closeAddModal,
    openSelectModal,
    closeSelectModal,
  };
}

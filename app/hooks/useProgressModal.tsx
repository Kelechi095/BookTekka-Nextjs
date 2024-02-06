"use client";
import { useUpdateProgressModal } from "../zustand/store";

const useProgressModal = () => {
  const isProgressModalOpen = useUpdateProgressModal(
    (state: any) => state.isProgressModalOpen
  );
  const handleOpenProgressModal = useUpdateProgressModal(
    (state: any) => state.handleOpenProgressModal
  );
  const handleCloseProgressModal = useUpdateProgressModal(
    (state: any) => state.handleCloseProgressModal
  );

  return {
    isProgressModalOpen,
    handleOpenProgressModal,
    handleCloseProgressModal,
  };
};

export default useProgressModal;

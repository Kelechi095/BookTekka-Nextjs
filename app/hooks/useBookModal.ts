"use client";
import { useDeleteModal} from "../zustand/store";

const useBookModal = () => {
  const isDeleteModalOpen = useDeleteModal(
    (state: any) => state.isDeleteModalOpen
  );
  const handleOpenDeleteModal = useDeleteModal(
    (state: any) => state.handleOpenDeleteModal
  );
  const handleCloseDeleteModal = useDeleteModal(
    (state: any) => state.handleCloseDeleteModal
  );

  return { isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal };
};

export default useBookModal;

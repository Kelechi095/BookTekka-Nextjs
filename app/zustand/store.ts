"use client";

import { create } from "zustand";

export type NewBookType = {
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  smallThumbnail: string;
};

export const useNavStore = create((set) => ({
  isSidebarOpen: false,
  
  handleCloseSidebar: () => set({ isSidebarOpen: false }),
  handleOpenSidebar: () => set({ isSidebarOpen: true }),
}));

export const useDeleteModal = create((set) => ({
  isDeleteModalOpen: false,
  handleOpenDeleteModal: () => set({ isDeleteModalOpen: true }),
  handleCloseDeleteModal: () => set({ isDeleteModalOpen: false }),
}));


export const useUpdateProgressModal = create((set) => ({
  isProgressModalOpen: false,
  handleOpenProgressModal: () => set({ isProgressModalOpen: true }),
  handleCloseProgressModal: () => set({ isProgressModalOpen: false }),
}));

export const useLibraryStore = create((set) => ({
  newBook: {},
  handleSetNewBook: (book: NewBookType) => set({ newBook: book }),
}));

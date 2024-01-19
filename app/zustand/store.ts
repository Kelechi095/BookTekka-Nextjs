'use client'

import { create } from 'zustand'

const useNavStore = create((set) => ({
  isSidebarOpen: false,
  handleCloseSidebar: () => set({ isSidebarOpen: false }),
  handleOpenSidebar: () => set({ isSidebarOpen: true }),
  
}))

export default useNavStore
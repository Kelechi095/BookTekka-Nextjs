"use client"
import { useNavStore } from "../zustand/store"

const useNav = () => {
  const isSidebarOpen = useNavStore((state: any) => state.isSidebarOpen)
  const handleOpenSidebar = useNavStore((state: any) => state.handleOpenSidebar)
  const handleCloseSidebar = useNavStore((state: any) => state.handleCloseSidebar)
  

  return {isSidebarOpen, handleOpenSidebar, handleCloseSidebar}
}

export default useNav

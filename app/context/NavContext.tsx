'use client'

import React, { createContext, useState, useCallback } from "react";

type NavContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
};

export const NavContext = createContext<NavContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const NavContextProvider = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  
  const value = {
    handleOpenSidebar,
    handleCloseSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <NavContext.Provider value={value} {...props} />;
};

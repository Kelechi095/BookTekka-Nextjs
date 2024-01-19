'use client'
import { NavContextProvider } from "../context/NavContext"


interface NavProviderProps {
    children: React.ReactNode
}

const NavProvider = ({children}: NavProviderProps) => {
  return <NavContextProvider>
        {children}
    </NavContextProvider>
  
}

export default NavProvider
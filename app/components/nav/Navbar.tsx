"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wrapper from "../Wrapper";
import Dropdown from "./Dropdown";
import useNav from "@/app/hooks/useNav";
import { HiMenuAlt2 } from "react-icons/hi";


const Navbar = ({currentUser}: any) => {
  const pathname = usePathname();
  const active = "text-cyan-600";
  const inactive = "text-gray-700";

  const { handleOpenSidebar, handleCloseSidebar } = useNav();
  

  return (
    <nav className="flex items-center xl:px-20 md:px-10 px-4 md:py-2 py-8 sticky top-0 left-0 w-full bg-white z-10 md:shadow-sm md:border-b">
      <HiMenuAlt2 size={34} className="md:hidden mr-6 cursor-pointer" onClick={handleOpenSidebar}/>
      <h1 className="font-semibold text-lg md:text-xl">BookTekka</h1>
      <div className="flex justify-between w-full">
        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium pl-6">
          <Link href="/" className={pathname === "/" ? active : inactive}>
            <li className="cursor-pointer">Home</li>
          </Link>
          <Link
            href="/library"
            className={pathname === "/library" ? active : inactive}
          >
            <li className="cursor-pointer">Library</li>
          </Link>
          <Link
            href="/overview"
            className={pathname === "/overview" ? active : inactive}
          >
            <li className="cursor-pointer">Stats</li>
          </Link>
          <Link
            href="/profile"
            className={pathname === "/profile" ? active : inactive}
          >
            <li className="cursor-pointer">Profile</li>
          </Link>
        </ul>
        <Dropdown currentUser={currentUser}/>
      </div>
    </nav>
  );
};

export default Navbar;

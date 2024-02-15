"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import useNav from "@/app/hooks/useNav";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = ({ currentUser }: any) => {
  const pathname = usePathname();
  const active = "text-cyan-600";
  const inactive = "text-gray-700";

  const { handleOpenSidebar, handleCloseSidebar } = useNav();

  console.log(currentUser)

  if(currentUser && !currentUser.username) return
  

  return (
    <nav className="flex items-center justify-between xl:px-20 md:px-10 px-4 md:py-2 py-3 sticky top-0 left-0 w-full bg-white z-10 shadow-sm border-b">
      <div className="flex items-center">
        {currentUser && <HiMenuAlt2
          size={24}
          className="md:hidden mr-4 cursor-pointer"
          onClick={handleOpenSidebar}
        />}
        <h1 className="font-semibold text-base md:text-xl ">BookTekka</h1>
        <div className="flex justify-between w-fit">
          {currentUser && <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium pl-6">
            <Link href="/" className={pathname === "/" || pathname.startsWith("/recommendation") ? active : inactive}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link
              href="/library"
              className={pathname.startsWith("/library") ? active : inactive}
            >
              <li className="cursor-pointer">Library</li>
            </Link>
            <Link
              href="/overview"
              className={pathname.startsWith('/overview') ? active : inactive}
            >
              <li className="cursor-pointer">Stats</li>
            </Link>
            <Link
              href="/profile"
              className={pathname.startsWith("/profile") ? active : inactive}
            >
              <li className="cursor-pointer">Profile</li>
            </Link>
          </ul>}
        </div>
      </div>
      <Dropdown currentUser={currentUser} />
    </nav>
  );
};

export default Navbar;

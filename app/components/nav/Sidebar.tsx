"use client";

import { FaTimes } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import useNav from "@/app/hooks/useNav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({currentUser}: any) {
  const { isSidebarOpen, handleOpenSidebar, handleCloseSidebar } = useNav();


  const active = "text-cyan-600 text-lg font-semibold";
  const inactive = "text-gray-700 text-lg";
  const pathname = usePathname();

  const handleLogout = () => {
    handleCloseSidebar();
  };

  return (
    <nav
      className={
        isSidebarOpen
          ? `h-full z-10 inset-0 absolute w-full md:hidden px-5 py-5 flex flex-col gap-12 bg-white`
          : "hidden"
      }
    >
      <div>
        <FaTimes
          onClick={handleCloseSidebar}
          className="cursor-pointer"
          size={20}
        />
      </div>
      <ul className=" bg-white flex gap-16 items-center h-full flex-col">
        <Link
          href="/"
          className={pathname === "/" ? active : inactive}
          onClick={handleCloseSidebar}
        >
          <li>Home</li>
        </Link>

        <Link
          href="/library"
          className={pathname === "/library" ? active : inactive}
          onClick={handleCloseSidebar}
        >
          <li>Library</li>
        </Link>

        <Link
          href="/profile"
          className={pathname === "/profile" ? active : inactive}
          onClick={handleCloseSidebar}
        >
          <li>Profile</li>
        </Link>

        <Link
          href="/overview"
          className={pathname === "/overview" ? active : inactive}
          onClick={handleCloseSidebar}
        >
          <li>Stats</li>
        </Link>
      </ul>
    </nav>
  );
}

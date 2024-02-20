"use client";

import { FaHome, FaTimes } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import useNav from "@/app/hooks/useNav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ currentUser }: any) {
  const { isSidebarOpen, handleOpenSidebar, handleCloseSidebar } = useNav();

  const active = "text-cyan-600 text-lg font-semibold flex gap-4 items-center";
  const inactive = "text-gray-700 text-lg flex gap-4 items-center";
  const pathname = usePathname();

  return (
    <div
      className={
        isSidebarOpen
          ? "inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10"
          : ""
      }
      onClick={handleCloseSidebar}
    >
      <nav
        className={
          isSidebarOpen
            ? "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 left-0 fixed "
            : "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 -left-96 fixed"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center my-2">
          {
            <FaTimes
              size={25}
              className="cursor-pointer text-gray-700"
              onClick={handleCloseSidebar}
            />
          }
        </div>

        <ul className="py-1 bg-white flex justify-around gap-4 flex-col">
          <Link
            href="/"
            className={pathname === "/" ? active : inactive}
            onClick={handleCloseSidebar}
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <BsPeopleFill size={28} />
              <span className="font-semibold text-base ">Home</span>
            </li>
          </Link>
          <Link
            href="/library"
            className={pathname === "/library" ? active : inactive}
            onClick={handleCloseSidebar}
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <MdMenuBook size={28} />
              <span className={"font-semibold text-base"}>Library</span>
            </li>
          </Link>
          <Link
            href="/profile"
            className={pathname === "/profile" ? active : inactive}
            onClick={handleCloseSidebar}
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <CgProfile size={28} />
              <span className="font-semibold text-base">Profile</span>
            </li>
          </Link>
          <Link
            href="/overview"
            className={pathname === "/overview" ? active : inactive}
            onClick={handleCloseSidebar}
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <BsFillBarChartFill size={28} />
              <span className="font-semibold text-base ">Stats</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

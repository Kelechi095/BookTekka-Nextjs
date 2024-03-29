"use client";

import { FaHome, FaTimes } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import useNav from "@/app/hooks/useNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafeUser } from "@/types";

interface SidebarProps {
  currentUser: SafeUser | null;
}

export default function Sidebar({ currentUser }: SidebarProps) {
  const { isSidebarOpen, handleCloseSidebar } = useNav();

  const active =
    "text-cyan-600 text-lg font-semibold flex gap-4 items-center w-fit";
  const inactive = "text-gray-700 text-lg flex gap-4 items-center w-fit";
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
            ? "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 left-0 fixed z-10"
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
          {!currentUser && (
            <Link
              href="/register"
              className={pathname === "/register" ? active : inactive}
              onClick={handleCloseSidebar}
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <BsPeopleFill size={28} />
                <span className="font-semibold text-base ">Register</span>
              </li>
            </Link>
          )}
          {!currentUser && (
            <Link
              href="/login"
              className={pathname === "/login" ? active : inactive}
              onClick={handleCloseSidebar}
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <BsPeopleFill size={28} />
                <span className="font-semibold text-base ">Login</span>
              </li>
            </Link>
          )}

          {currentUser && (
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
          )}
          {currentUser && (
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
          )}

          {currentUser && (
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
          )}
        </ul>
      </nav>
    </div>
  );
}

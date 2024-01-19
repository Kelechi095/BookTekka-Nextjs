'use client'

import { FaTimes } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import useNav from "@/app/hooks/useNav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const {
    isSidebarOpen, handleOpenSidebar, handleCloseSidebar
  } = useNav();

  console.log(isSidebarOpen)


  const active = "text-cyan-600 w-fit";
  const inactive = "text-gray-700 w-fit";
  const pathname = usePathname();

  const handleLogout = () => {
    handleCloseSidebar()
  };

  return (
    
    <div
      className={
        isSidebarOpen
          ? "inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10"
          : ""
      }
      onClick={handleOpenSidebar}
    >
      <nav
        className={
          isSidebarOpen
            ? "w-[300px] bg-white py-8 px-4 text-[13px]  shadow-md md:hidden h-full top-0 left-0 fixed"
            : "w-[300px] bg-white py-8 px-4 text-[13px]  shadow-md h-full top-0 -left-96 fixed"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center">
          {
            <FaTimes
              size={25}
              className="cursor-pointer text-gray-700"
              onClick={handleCloseSidebar}
            />
          }
        </div>

        <ul className="py-1 bg-white flex justify-around flex-col">
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

          <li
            className="cursor-pointer flex gap-4 items-center w-fit mt-8 text-rose-700"
            onClick={handleLogout}
          >
            <BiLogOut size={28} />
            <span className="font-semibold text-base">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

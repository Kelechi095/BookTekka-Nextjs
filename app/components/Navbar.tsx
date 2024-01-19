"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wrapper from "./Wrapper";

const Navbar = () => {
  const pathname = usePathname();
  const active = "text-cyan-600";
  const inactive = "text-gray-700";
  return (
    <nav className="nav">
      <div className="border-b-[1px] py-4">
        <Wrapper>
          <div className="inner-nav">
            <ul className="flex items-center justify-between gap-8 text-base">
              <h1 className="font-semibold text-xl">BookTekka</h1>
              <Link href="/" className={pathname === "/" ? active : inactive}>
                <li className="cursor-pointer">
                  Home
                </li>
              </Link>
              <Link href="/library" className={pathname === "/library" ? active : inactive}>
                <li className="cursor-pointer">
                  Library
                </li>
              </Link>
              <Link href="/overview" className={pathname === "/overview" ? active : inactive}>
                <li className="cursor-pointer">
                  Overview
                </li>
              </Link>
              <Link href="/profile" className={pathname === "/profile" ? active : inactive}>
                <li className="cursor-pointer">
                  Profile
                </li>
              </Link>

              
            </ul>
            {/* <Dropdown /> */}
          </div>
        </Wrapper>
      </div>
    </nav>
  );
};

export default Navbar;

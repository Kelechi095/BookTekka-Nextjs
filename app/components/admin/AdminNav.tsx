"use client";

import React from "react";
import Wrapper from "../Wrapper";
import AdminNavItem from "./AdminNavItem";
import Link from "next/link";
import { MdDns, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import { UserType } from "@/types";

interface AdminNavProps {
  currentUser: UserType
}

const AdminNav = ({ currentUser }: AdminNavProps) => {
  const pathname = usePathname();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return;
  }

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Wrapper>
        <div className="flex md:flex-row flex-col items-center justify-center gap-12">
          <Link href="/admin">
            <AdminNavItem
              label="Stats"
              icon={MdDns}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/manage-users">
            <AdminNavItem
              label="Manage Users"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/manage-users"}
            />
          </Link>
          <Link href="/admin/manageRecommendations">
            <AdminNavItem
              label="Manage Recommendations"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/manageRecommendations"}
            />
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default AdminNav;

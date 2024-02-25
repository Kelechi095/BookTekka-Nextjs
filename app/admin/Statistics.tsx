import { AdminStatsType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface StatsProps {
  stats: AdminStatsType | null;
}

const Statistics = ({ stats }: StatsProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="shadow-md p-4 flex flex-col justify-between h-40">
          <div className="">
            <h2 className="text-neutral-500">Total Registered Users</h2>
            <h2 className="font-semibold text-4xl mt-3 text-slate-800 mx-4">
              {stats?.allUsers}
            </h2>
          </div>
          <Link
            href="/admin/manageUsers"
            className="border flex gap-4 items-center border-neutral-300 py-2 px-4 rounded w-fit text-sm font-semibold hover:bg-neutral-200 transition duration-300"
          >
            <p>Manage Users</p>
            <FaLongArrowAltRight />
          </Link>
        </div>
        <div className="shadow-md p-4 flex flex-col justify-between h-40">
          <div className="">
            <h2 className="text-neutral-500">Total Recommendations</h2>
            <h2 className="font-semibold text-4xl mt-3 text-slate-800 mx-4">
              {stats?.allRecommendations}
            </h2>
          </div>
          <Link
            href="/admin/manageRecommendations"
            className="border flex gap-4 items-center border-neutral-300 py-2 px-4 rounded w-fit text-sm font-semibold hover:bg-neutral-200 transition duration-300"
          >
            <p>Manage Recommendations</p>
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

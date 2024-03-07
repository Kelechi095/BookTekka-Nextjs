"use client";

import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { BiSolidBookAlt, BiSolidBookReader } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import UiLoader from "../components/UiLoader";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { SafeUser, UserStatsType } from "@/types";

interface OverviewClientProps {
  currentUser: SafeUser | null;
  stats: UserStatsType | null;
}

const OverviewClient = ({ stats, currentUser }: OverviewClientProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!stats) return <UiLoader />;

  return (
    <Wrapper>
      <div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-md p-4 flex flex-col justify-between h-40">
            <div>
              <h2 className="text-neutral-500">Total Books in Library</h2>
              <h2 className="font-semibold text-4xl mt-3 text-slate-800 mx-4">
                {stats?.allbooks}
              </h2>
            </div>
            <Link
              href="/library"
              className="border flex gap-4 items-center border-neutral-300 py-2 px-4 rounded w-fit text-sm font-semibold hover:bg-neutral-200 transition duration-300"
            >
              <p>View Books</p>
              <FaLongArrowAltRight />
            </Link>
          </div>
          <div className="shadow-md p-4 flex flex-col justify-between h-40">
            <div>
              <h2 className="text-neutral-500">Total Recommendations</h2>
              <h2 className="font-semibold text-4xl mt-3 text-slate-800 mx-4">
                {stats?.recommendations}
              </h2>
            </div>
            <Link
              href="/"
              className="border flex gap-4 items-center border-neutral-300 py-2 px-4 rounded w-fit text-sm font-semibold hover:bg-neutral-200 transition duration-300"
            >
              <p>View Recommendations</p>
              <FaLongArrowAltRight />
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
          <div className="shadow-md border border-neutral-100 px-4 py-8 flex flex-col justify-between h-36">
            <div className="flex justify-between">
              <h2 className="text-neutral-500">Total unread books</h2>
              <BiSolidBookAlt size={24} className="text-red-500" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-3 text-slate-800 mx-4">
                {stats?.unread}
              </h2>
            </div>
          </div>
          <div className="shadow-md border border-neutral-100 px-4 py-8 flex flex-col justify-between h-36">
            <div className="flex justify-between">
              <h2 className="text-neutral-500">Total books read</h2>
              <FaBook size={24} className="text-green-500" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-3 text-slate-800 mx-4">
                {stats?.finished}
              </h2>
            </div>
          </div>
          <div className="shadow-md border border-neutral-100 px-4 py-8 flex flex-col justify-between h-36">
            <div className="flex justify-between">
              <h2 className="text-neutral-500">
                Total books currently being read
              </h2>
              <BiSolidBookReader size={24} className="text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-3 text-slate-800 mx-4">
                {stats?.reading}
              </h2>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default OverviewClient;

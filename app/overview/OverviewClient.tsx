"use client"

import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { BiSolidBookAlt, BiSolidBookReader } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";
import UiLoader from "../components/UiLoader";

const OverviewClient = ({ stats, currentUser }: any) => {
const router = useRouter()

  useEffect(() => {
    if(!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])
  
  if(!stats) return <UiLoader />


  return (
    <Wrapper>
      <div >
        <div className="lg:grid lg:grid-cols-2  gap-2 lg:gap-8">
        <div className="border border-b-[6px] shadow-sm border-b-purple-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <p className="font-bold text-4xl text-purple-500">
                {stats?.allbooks}
              </p>
              <BsEye size={40} className="text-purple-500" />
            </div>
            <p className="font-semibold text-gray-500 text-lg">
              All Books
            </p>
          </div>
          <div className="border border-b-[6px] shadow-sm border-b-red-500 rounded-b -lg h-48 mt-8 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <p className="font-bold text-4xl text-red-500">
                {stats?.unread}
              </p>
              <BiSolidBookAlt size={40} className="text-red-500" />
            </div>
            <p className="font-semibold text-gray-500 text-lg">Unread</p>
          </div>
          <div className="border border-b-[6px] shadow-sm border-b-blue-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <p className="font-bold text-4xl text-blue-500">
                {stats?.reading}
              </p>
              <BiSolidBookReader size={40} className="text-blue-500" />
            </div>
            <p className="font-semibold text-gray-500 text-lg">Reading</p>
          </div>
          <div className="border border-b-[6px] shadow-sm border-b-green-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <p className="font-bold text-4xl text-green-500">
                {stats?.finished}
              </p>
              <FaBook size={40} className="text-green-500" />
            </div>
            <p className="font-semibold text-gray-500 text-lg">Finished</p>
          </div>
          
        </div>
      </div>
    </Wrapper>
  );
};

export default OverviewClient;

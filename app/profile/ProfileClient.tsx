"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UiLoader from "../components/UiLoader";

const ProfileClient = ({ currentUser }: any) => {
    const noUser =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg";

    const router = useRouter()

    useEffect(() => {
      if(!currentUser) {
        router.push('/')
      }
    }, [currentUser, router])
    
    //if(!currentUser) return <UiLoader />
  

  return (
    <div className="content">
      <div className=" mx-auto mt-8 flex flex-col items-center justify-center">
        <Image
          src={currentUser?.image ? currentUser?.image :  noUser}
          alt="user image"
          width="0"
          height="0"
          sizes="100vw"
          className="shadow rounded-full w-40 h-40 md:w-60 md:h-60 object-cover border-none"
        />
        <p className="self-center mt-4 font-semibold md:text-lg">
          {currentUser?.name}
        </p>
        <p className="self-center mt-1 font-semibold">{currentUser?.email}</p>
        <Link
          href="/profile/edit-profile"
          className="border px-2 py-1 mt-1 rounded bg-cyan-600 text-white text-sm self-center"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileClient;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { noUser } from "../utils/noUser";
import { SafeUser } from "@/types";

interface ProfileClientProps {
  currentUser: SafeUser | null;
}

const ProfileClient = ({ currentUser }: ProfileClientProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="w-full md:w-[60%] mx-auto shadow-sm">
      <div className="w-full bg-slate-300 h-[200px] relative px-6">
        <Image
          src={currentUser?.image ? currentUser?.image : noUser}
          alt="user image"
          width="0"
          height="0"
          sizes="100vw"
          className="shadow rounded-full w-32 h-32 md:w-36 md:h-36 object-cover border-4 border-white absolute -bottom-14 md:-bottom-16"
        />
        <div className="absolute -bottom-9 right-10">
          <Link
            href="/profile/edit-profile"
            className="border border-neutral-300 py-2 px-4 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="mt-16 p-4">
        <p className="self-center font-bold text-lg">{currentUser?.name}</p>
        <p className="self-center text-neutral-400 text-sm">
          @{currentUser?.username}
        </p>
        <p className="self-center text-neutral-400 text-sm">
          Email: {currentUser?.email}
        </p>
        <p className="self-center text-sm">{currentUser?.bio}</p>
      </div>
    </div>
  );
};

export default ProfileClient;

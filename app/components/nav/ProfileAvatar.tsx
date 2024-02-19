"use client"

import Image from "next/image";
import { noUser } from "@/app/utils/noUser";

interface ProfilePictureProps {
  profilePicture?: string | null | undefined;
}

const ProfileAvatar = ({ profilePicture }: ProfilePictureProps) => {
  
  return (
    <Image
      width="0"
      height="0"
      sizes="100vw"
      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
      alt="Avatar"
      src={profilePicture ? profilePicture : noUser}
    />
  );
};

export default ProfileAvatar;

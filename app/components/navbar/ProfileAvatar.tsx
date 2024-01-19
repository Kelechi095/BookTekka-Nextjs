import Image from "next/image";

interface ProfilePictureProps {
  profilePicture: string;
}

const ProfileAvatar = ({ profilePicture }: ProfilePictureProps) => {
  return (
    <Image
      className="rounded-full"
      height={30} width={30}
      alt="Avatar"
      src={profilePicture}
    />
  );
};

export default ProfileAvatar;

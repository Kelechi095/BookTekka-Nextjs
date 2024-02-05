import Image from "next/image";

interface ProfilePictureProps {
  profilePicture?: string | null | undefined;
}

const ProfileAvatar = ({ profilePicture }: ProfilePictureProps) => {
  const noUser =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
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

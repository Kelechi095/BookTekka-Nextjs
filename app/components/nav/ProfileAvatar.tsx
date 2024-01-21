import Image from "next/image";

interface ProfilePictureProps {
  profilePicture?: string | null | undefined
}

const ProfileAvatar = ({ profilePicture }: ProfilePictureProps) => {
  const noUser = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
  return (
    <Image
      className="rounded-full"
      height={21} width={21}
      alt="Avatar"
      src={profilePicture ? profilePicture : noUser}
    />
  );
};

export default ProfileAvatar;

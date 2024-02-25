import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";

const Profile = async () => {
  const currentUser = await getCurrentUser();
  return <ProfileClient currentUser={currentUser} />;
};

export default Profile;

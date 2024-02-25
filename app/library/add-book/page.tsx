import React from "react";
import AddBookClient from "./AddBookClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

const page = async () => {
  const currentUser: any = await getCurrentUser();
  return <AddBookClient currentUser={currentUser} />;
};

export default page;

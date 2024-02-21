import React from "react";
import EditRecommendationClient from "./EditRecommendationClient";
import { getRecommendationById } from "@/actions/getRecommendationById";
import NotAllowed from "@/app/components/NotAllowed";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  bookId?: any;
}

const page = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NotAllowed title="Oops! Access Denied" />;
  }

  const recommendation = await getRecommendationById(params.bookId);
  return <EditRecommendationClient recommendation={recommendation} />;
};

export default page;

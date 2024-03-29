import { getRecommendations } from "@/actions/getRecommendations";
import HomeClient from "./HomeClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { HomeData } from "@/types";

export default async function Home({ searchParams }: any) {
  const data: HomeData | null = await getRecommendations(searchParams);
  const totalRecommendations = data?.totalRecommendations;
  const recommendations: any = data?.recommendation;
  const currentUser = await getCurrentUser();

  return (
    <HomeClient
      recommendations={recommendations}
      currentUser={currentUser}
      totalRecommendations={totalRecommendations}
    />
  );
}

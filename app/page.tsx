
import { getRecommendations } from "@/actions/getRecommendations";
import HomeClient from "./HomeClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Home({searchParams}: any) {
  const data = await getRecommendations(searchParams)
  const totalRecommendations = data?.totalRecommendations
  const recommendations = data?.recommendation
   const currentUser = await getCurrentUser()

  
  return (
    <HomeClient recommendations={recommendations} currentUser={currentUser} totalRecommendations={totalRecommendations} />
  );
}

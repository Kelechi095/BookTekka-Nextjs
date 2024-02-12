
import { getRecommendations } from "@/actions/getRecommendations";
import HomeClient from "./HomeClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Home({searchParams}: any) {
  const recommendations = await getRecommendations(searchParams)
   const currentUser = await getCurrentUser()

  
  return (
    <HomeClient recommendations={recommendations} currentUser={currentUser} />
  );
}

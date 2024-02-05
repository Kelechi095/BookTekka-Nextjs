
import { getRecommendations } from "@/actions/getRecommendations";
import HomeClient from "./HomeClient";
import Wrapper from "./components/Wrapper";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getReviews } from "@/actions/getReviews";

export default async function Home() {
  const data = await getRecommendations()
  const recommendations:any = data?.reverse()
  const currentUser = await getCurrentUser()


  return (
    <HomeClient recommendations={recommendations} currentUser={currentUser}/>
  );
}

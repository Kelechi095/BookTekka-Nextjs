import { getCurrentUser } from "@/actions/getCurrentUser"
import Wrapper from "@/app/components/Wrapper"
import NotAllowed from "@/app/components/NotAllowed"
import ManageRecommendationsClient from "./ManageRecommendationsClient"
import { getAllRecommendations } from "@/actions/getAllRecommendations"

const page = async () => {

 const recommendations = await getAllRecommendations()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NotAllowed title="Oops! Access Denied" />;
  }

  return (
    <div className='pt-8'>
        <Wrapper>
          <ManageRecommendationsClient recommendations={recommendations}/>
        </Wrapper>
    </div>
  )
}

export default page
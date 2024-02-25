import { getCurrentUser } from "@/actions/getCurrentUser"
import Wrapper from "../components/Wrapper"
import NotAllowed from "../components/NotAllowed"
import Statistics from "./Statistics"
import { getAdminStats } from "@/actions/getAdminStats"

const Admin = async () => {
  const currentUser = await getCurrentUser()
  const stats = await getAdminStats()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NotAllowed title="Oops! Access Denied" />;
  }

  return (
    <div className='pt-8'>
        <Wrapper>
          <Statistics stats={stats}/>
        </Wrapper>
    </div>
  )
}

export default Admin
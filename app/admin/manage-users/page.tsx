import { getCurrentUser } from "@/actions/getCurrentUser"
import Wrapper from "@/app/components/Wrapper"
import NotAllowed from "@/app/components/NotAllowed"
import { getAllUsers } from "@/actions/getAllUsers"
import ManageUsersClient from "./ManageUsersClient"

const page = async () => {

  const currentUser = await getCurrentUser()
  const users = await getAllUsers()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NotAllowed title="Oops! Access Denied" />;
  }

  return (
    <div className='pt-8'>
        <Wrapper>
          <ManageUsersClient users={users}/>
        </Wrapper>
    </div>
  )
}

export default page
import { getCurrentUser } from "@/actions/getCurrentUser"
import AdminNav from "../components/admin/AdminNav"


export const metaData = {
    title: "Booktekka Admin",
    description: " Booktekka Admin Dashboard"
}

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = async ({children}: AdminLayoutProps) => {
    const currentUser = await getCurrentUser()
  return (
    <div>
        <AdminNav currentUser={currentUser}/>
        {children}
    </div>
  )
}

export default AdminLayout
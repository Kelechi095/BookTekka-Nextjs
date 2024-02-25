import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminNav from "../components/admin/AdminNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <AdminNav currentUser={currentUser} />
      {children}
    </>
  );
};

export default AdminLayout;

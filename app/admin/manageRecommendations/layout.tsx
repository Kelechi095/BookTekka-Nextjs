import { getCurrentUser } from "@/actions/getCurrentUser";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const ManageRecommendationLayout = async ({ children }: AdminLayoutProps) => {
  return <>{children}</>;
};

export default ManageRecommendationLayout;

import { getCurrentUser } from "@/actions/getCurrentUser";
import Login from "../login/page";
import HomeClient from "../HomeClient";
import { Suspense } from "react";
import Loading from "./loading";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

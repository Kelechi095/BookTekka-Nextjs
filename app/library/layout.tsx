import { getCurrentUser } from "@/actions/getCurrentUser";
import Login from "../login/page";
import HomeClient from "../HomeClient";

interface LayoutProps {
    children: React.ReactNode;
  }

  
  export default async function Layout({ children }: LayoutProps) {
    const currentUser = await getCurrentUser()
    
    return <>
    {children}
    </>;
  }
  
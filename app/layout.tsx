import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/nav/Sidebar";
import ToasterProvider from "./providers/ToastProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookTekka",
  description: "App for book recommendation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()

  console.log(currentUser)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser}/>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/nav/Sidebar";
import ToasterProvider from "./providers/ToastProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Loading from "./loading";
import { Suspense } from "react";
import Footer from "./components/footer/Footer";

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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <div className="min-h-screen flex flex-col">
          <Navbar currentUser={currentUser} />
          <Sidebar currentUser={currentUser} />
          {
            <Suspense fallback={<Loading />}>
              <main className="flex-grow">{children}</main>
              <Footer />
            </Suspense>
          }
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import NavProvider from "./providers/NavProvider";
import Sidebar from "./components/nav/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookTekka",
  description: "App for book recommendation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavProvider>
          <Navbar />
          <Sidebar />
          {children}
        </NavProvider>
      </body>
    </html>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getBookByTitle(title: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const book = await prisma.library.findMany({
      where: {
        title: title,
        posterId: currentUser.id
      },
    });

    return book;
  } catch (error: any) {
    return null;
  }
}

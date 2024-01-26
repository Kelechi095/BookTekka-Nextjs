import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllBooks() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const books = await prisma.library.findMany({
      where: {
        posterId: currentUser?.id,
      },
    });

    return books;
  } catch (error: any) {
    return null;
  }
}

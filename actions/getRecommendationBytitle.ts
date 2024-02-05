import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getRecommendationByTitle(title: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const book = await prisma.recommendation.findMany({
      where: {
        title: title,
      },
    });

    return book;
  } catch (error: any) {
    return null;
  }
}

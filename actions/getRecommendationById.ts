import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getRecommendationById(id: string) {
  try {

    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: id,
      },
    });

    return recommendation;
  } catch (error: any) {
    return null;
  }
}

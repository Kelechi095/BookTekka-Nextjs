import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllRecommendations() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const data = await prisma.recommendation.findMany();
    const recommendations = data.reverse();

    return recommendations;
  } catch (error: unknown) {
    return null;
  }
}

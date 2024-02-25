import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getAdminStats() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const recommendations = await prisma.recommendation.findMany();
    const users = await prisma.user.findMany();

    const allRecommendations = recommendations.length;
    const allUsers = users.length;

    return {
      allUsers,
      allRecommendations,
    };
  } catch (error: unknown) {
    return null;
  }
}

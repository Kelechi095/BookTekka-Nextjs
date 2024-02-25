import prisma from "../app/lib/prismadb";

export async function getRecommendationById(id: string) {
  try {
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: id,
      },
    });

    return recommendation;
  } catch (error: unknown) {
    return null;
  }
}

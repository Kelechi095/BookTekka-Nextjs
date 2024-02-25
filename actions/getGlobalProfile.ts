import prisma from "../app/lib/prismadb";

export async function getGlobalProfile(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const userBooks = await prisma.library.findMany({
      where: {
        posterId: id,
      },
    });

    const userRecommendations = await prisma.recommendation.findMany({
      where: {
        posterId: id,
      },
    });

    return {
      ...user,
      userBooks,
      userRecommendations,
    };
  } catch (error: unknown) {
    return null;
  }
}

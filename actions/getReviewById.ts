import prisma from "../app/lib/prismadb";

interface Review {
  
}

export async function getReviewById(id: string) {
  try {
    const allReviews = await prisma.reviews.findMany({
      where: {
        recommendationId: id,
      },
    });

    const userReviews = allReviews.map(async (review: any) => {
      const theUser = await prisma.user.findUnique({
        where: {
          id: review.userId,
        },
      });

      review.user = theUser;
      return review;
    });

    const reviews = await Promise.all(userReviews);

    return reviews;
  } catch (error: any) {
    return null;
  }
}

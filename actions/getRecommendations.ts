import prisma from "../app/lib/prismadb";
import { getReviewById } from "./getReviewById";
import { getReviews } from "./getReviews";

export async function getRecommendations() {
  try {
    const allRecommendations = await prisma.recommendation.findMany();

    const userRecommendation: any = allRecommendations.map(
      async (book: any) => {
        const theUser = await prisma.user.findUnique({
          where: {
            id: book.posterId,
          },
        });

        const reviews = await getReviewById(book.id);

        book.reviews = reviews;
        book.user = theUser;

        return book;
      }
    );

    const recommendation = await Promise.all(userRecommendation);

    return recommendation;
  } catch (error: any) {
    return null;
  }
}

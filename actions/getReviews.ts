import prisma from "../app/lib/prismadb";

export async function getReviews() {
  try {
    const allReviews = await prisma.reviews.findMany();
    
    const userReviews: any = allReviews.map(async (review: any) => {
      const theUser = await prisma.user.findUnique({
        where: {
          id: review.userId
        }
      })

      review.user = theUser
      return review
    })

    const reviews = await Promise.all(userReviews)

    return reviews

  } catch (error: any) {
    return null;
  }
}

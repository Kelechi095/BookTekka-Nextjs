import prisma from "../app/lib/prismadb";
import { getReviewById } from "./getReviewById";

export interface IRecommendationParams {
  genre?: string | null;
  sort?: string | null;
  searchTerm?: string | null;
  page?: number | null;
}

export async function getRecommendations(params: IRecommendationParams) {
  try {
    const { genre, sort, searchTerm, page } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (genre && genre !== "All") {
      query.genre = genre;
    }

    const firstRecommendations = await prisma.recommendation.findMany({
      where: {
        ...query,
        OR: [
          {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    let allRecommendations;

    if (sort === "Z-A") {
      allRecommendations = firstRecommendations.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return 1;
        }

        if (a.title > b.title) {
          return -1;
        }

        return 0;
      });
    } else if (sort === "A-Z") {
      allRecommendations = firstRecommendations.sort((a: any, b: any) => {
        if (a.title > b.title) {
          return 1;
        }

        if (a.title < b.title) {
          return -1;
        }

        return 0;
      });
    } else if (sort === "Likes") {
      allRecommendations = firstRecommendations.sort(
        (a: any, b: any) => b.likes - a.likes
      );
    } else if (sort === "Newest") {
      allRecommendations = firstRecommendations.reverse();
    } else if (sort === "Oldest") {
      allRecommendations = firstRecommendations;
    } else {
      allRecommendations = firstRecommendations.sort(
        (a: any, b: any) => b.likes - a.likes
      );
    }

    const totalRecommendations = allRecommendations.length;

    const indexOfLastRecommendation = 20 * (page ? page : 1);
    const indexOfFirstRecommendation = indexOfLastRecommendation - 20;
    const currentRecommendations = allRecommendations.slice(
      indexOfFirstRecommendation,
      indexOfLastRecommendation
    );

    const userRecommendation = currentRecommendations?.map(
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

    return {
      recommendation,
      totalRecommendations,
    };
  } catch (error: unknown) {
    return null;
  }
}

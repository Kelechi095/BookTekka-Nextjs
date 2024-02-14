import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export interface IProductParams {
  status?: string | null;
  sort?: string | null;
  searchTerm?: string | null;
  page?: number | null
}


export async function getAllBooks(params: IProductParams) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const { status, sort, searchTerm, page } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (status && status !== "All") {
      query.status = status;
    }


    const firstBooks = await prisma.library.findMany({
      where: {
        posterId: currentUser.id,
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

    let allBooks;

    if (sort === "Z-A") {
      allBooks = firstBooks.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return 1;
        }

        if (a.title > b.title) {
          return -1;
        }

        return 0;
      });
    } else if (sort === "A-Z") {
      allBooks = firstBooks.sort((a: any, b: any) => {
        if (a.title > b.title) {
          return 1;
        }

        if (a.title < b.title) {
          return -1;
        }

        return 0;
      });
    } else if (sort === "Newest") {
      allBooks = firstBooks.reverse();
    } else if (sort === "Oldest") {
      allBooks = firstBooks;
    } else {
      allBooks = firstBooks.reverse();
    }

    const totalBooks = allBooks.length

    const indexOfLastBook = 4 * ( page ? page : 1);
    const indexOfFirstBook = indexOfLastBook - 4;
    const books = allBooks.slice(
      indexOfFirstBook,
      indexOfLastBook
    );


    return {
      books,
      totalBooks
    }
  } catch (error: any) {
    return null;
  }
}

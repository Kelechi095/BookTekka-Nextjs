
import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getBook(bookId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const book = await prisma.library.findUnique({
      where: {
        id: bookId,
      },
    });

    return book;
  } catch (error: any) {
    return null;
  }
}

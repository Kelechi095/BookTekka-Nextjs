import prisma from "../app/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getStats() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const books = await prisma.library.findMany({
      where: {
        posterId: currentUser.id,
      },
    });

    const finished = books.filter((book) => book.status === "Finished");
    const unread = books.filter((book) => book.status === "Unread");
    const reading = books.filter((book) => book.status === "Reading");

    return {
      allbooks: books.length,
      finished: finished.length,
      unread: unread.length,
      reading: reading.length,
    };
  } catch (error: any) {
    return null;
  }
}

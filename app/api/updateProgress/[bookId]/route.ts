import prisma from "../../../lib/prismadb"
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PATCH(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { currentPage, totalPages, pagesRemaining, progress } = await request.json();

  
  await prisma.library.update({
    where: { id: params.bookId },
    data: {
      currentPage: currentPage,
      totalPages: totalPages,
      pagesRemaining,
      progress,
    },
  });

  return NextResponse.json("Book progress updated");
}

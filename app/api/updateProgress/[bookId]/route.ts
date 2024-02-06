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

  const { currentPage, totalPages } = await request.json();
  
  console.log(currentPage, totalPages, params)

  
  await prisma.library.update({
    where: { id: params.bookId },
    data: {
      currentPage: Number(currentPage),
      totalPages: Number(totalPages),
      pagesRemaining: Number(totalPages) - Number(currentPage)
    },
  });

  return NextResponse.json("Book progress updated");
}

import prisma from "../../../lib/prismadb"
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { currentPage, totalPages} = await request.json();


  const pagesRemaining = totalPages - currentPage
  const progress = Math.ceil((currentPage / totalPages) * 100)

  
  await prisma.library.update({
    where: { id: params.id },
    data: {
      currentPage,
      totalPages,
      pagesRemaining: pagesRemaining,
      progress: progress
    },
  });

  return NextResponse.json("Book progress updated");
}

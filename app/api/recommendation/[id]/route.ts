import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {


  const book = await prisma.recommendation.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(book);
}

//Edit book
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { genre} = await request.json();

  await prisma.recommendation.update({
    where: { id: params.id },
    data: {
      genre: genre,
    },
  });
  return NextResponse.json("Recommendation edited");
}

//Delete book
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  await prisma.recommendation.delete({
    where: { id: params.id },
  });
  return NextResponse.json("Recommendation deleted");
}


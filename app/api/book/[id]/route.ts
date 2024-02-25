import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const book = await prisma.library.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(book);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { genre, status } = await request.json();

  await prisma.library.update({
    where: { id: params.id },
    data: {
      genre: genre,
      status: status,
    },
  });
  return NextResponse.json("Book edited successfully");
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  await prisma.library.delete({
    where: { id: params.id },
  });
  return NextResponse.json("book deleted successfully");
}

import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title, author, description, thumbnail, smallThumbnail, genre, status } =
    await request.json();

  await prisma.library.create({
    data: {
      posterId: currentUser.id,
      title,
      author,
      description,
      thumbnail,
      smallThumbnail,
      genre,
      status
    },
  });

  return NextResponse.json("Book created successfully");
}

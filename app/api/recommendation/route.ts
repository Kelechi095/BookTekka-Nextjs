import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title, author, description, thumbnail, smallThumbnail, genre } =
    await request.json();

  await prisma.recommendation.create({
    data: {
      title,
      author,
      description,
      thumbnail,
      smallThumbnail,
      genre,
      posterId: currentUser.id,
      poster: currentUser.name,
      posterImage: currentUser.image,

    },
  });

  return NextResponse.json("Book added to recommendations");
}

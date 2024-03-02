import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getRecommendationByTitle } from "@/actions/getRecommendationBytitle";
import { getRecommendations } from "@/actions/getRecommendations";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title, author, description, thumbnail, smallThumbnail, genre } =
    await request.json();

  const isBook: any = await getRecommendationByTitle(title);

  if (isBook.length) {
    return new NextResponse("Book already recommended", {
      status: 400,
    });
  }

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

export async function GET(request: Request) {
  const { params } = await request.json();

  const recommendations = await getRecommendations(params);
  return NextResponse.json(recommendations);
}

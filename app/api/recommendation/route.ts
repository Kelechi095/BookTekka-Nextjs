import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getRecommendationByTitle } from "@/actions/getRecommendationBytitle";
import { getRecommendations } from "@/actions/getRecommendations";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const sort = request.nextUrl.searchParams.get("sort");
  const genre = request.nextUrl.searchParams.get("sort");
  const page = Number(request.nextUrl.searchParams.get("page"));
  const searchTerm = request.nextUrl.searchParams.get("searchTerm");

  const params = { sort, genre, page, searchTerm };

  const data: any = await getRecommendations(params);

  return NextResponse.json({
    recommendation: data.recommendation,
    totalRecommendations: data.totalRecommendations,
  });
}

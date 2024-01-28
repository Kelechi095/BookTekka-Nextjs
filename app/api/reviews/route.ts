import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { id } = await request.json();

  const review = await prisma.reviews.findMany({
    where: {
      recommendationId: id,
    },
  });

  return NextResponse.json(review);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const { review, recommendationId } = await request.json();

  await prisma.reviews.create({
    data: {
      userId: currentUser?.id,
      recommendationId,
      reviewerName: currentUser?.name,
      reviewerImage: currentUser?.image,
      review,
    },
  });

  return NextResponse.json("Review added");
}

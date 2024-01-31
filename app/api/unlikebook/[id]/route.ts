import prisma from "../../../lib/prismadb";
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

  const recommendation: any = await prisma.recommendation.findUnique({
    where: {
      id: params.id,
    },
  });

  const likers = recommendation.likers;

  const newLikers = likers.filter((item: string) => item !== currentUser.id);

  await prisma.recommendation.update({
    where: { id: params.id },
    data: {
      likes: { decrement: 1 },
      likers: newLikers,
    },
  });

  return NextResponse.json("Book unliked");
}

/*
 */

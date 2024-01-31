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

  
  await prisma.recommendation.update({
    where: { id: params.id },
    data: {
      likes: { increment: 1 },
      likers: {
        push: currentUser.id
      }
    },
  });

  return NextResponse.json("Book liked");
}

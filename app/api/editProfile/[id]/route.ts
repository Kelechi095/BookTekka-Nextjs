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

  const { newName, newUsername, image, bio } = await request.json();


  await prisma.user.update({
    where: { id: params.id },
    data: {
      name: newName,
      username: newUsername,
      image: image,
      bio: bio,
    },
  });

  return NextResponse.json("User updated");
}

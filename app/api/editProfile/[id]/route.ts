import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getUserByUsername } from "@/actions/getUserByUsername";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { newName, newUsername, image, bio } = await request.json();

  const usernameExists = await getUserByUsername(newUsername);

  if (usernameExists && currentUser.username !== newUsername) {
    return new NextResponse("Username already exists", { status: 400 });
  }

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

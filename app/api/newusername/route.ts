import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getUserByUsername } from "@/actions/getUserByUsername";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { username } = await request.json();

  const usernameExists = await getUserByUsername(username);

  if (usernameExists) {
    return new NextResponse("Username already exists", { status: 400 });
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      username: username,
    },
  });

  return NextResponse.json("Book created successfully");
}

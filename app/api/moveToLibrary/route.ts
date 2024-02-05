import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getBookByTitle } from "@/actions/getBookByTitle";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { title, author, description, thumbnail, smallThumbnail, genre } =
    await request.json();

  const isBook: any = await getBookByTitle(title);

  if (isBook.length) {
    return new NextResponse("Book already exists in your library", {
      status: 400,
    });
  } else {
    await prisma.library.create({
      data: {
        posterId: currentUser.id,
        title,
        author,
        description,
        thumbnail,
        smallThumbnail,
        genre,
        status: "Unread",
      },
    });
  }

  return NextResponse.json("Book added successfully");
}

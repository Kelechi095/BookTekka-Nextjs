import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getBookByTitle } from "@/actions/getBookByTitle";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    title,
    author,
    description,
    thumbnail,
    smallThumbnail,
    genre,
    status,
  } = await request.json();

  if (!genre || genre === "Genre") {
    return new NextResponse("Genre required", { status: 400 });
  }

  if (!status || status === "Status") {
    return new NextResponse("Status required", { status: 400 });
  }

  const isBook: any = await getBookByTitle(title);

  if (isBook.length) {
    return new NextResponse("Book already in library", {
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
        status,
      },
    });

    return NextResponse.json("Book created successfully");
  }
}

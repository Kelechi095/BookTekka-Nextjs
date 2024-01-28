import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {


  const book = await prisma.recommendation.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(book);
}

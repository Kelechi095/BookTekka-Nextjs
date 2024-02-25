import React from "react";
import { getBook } from "@/actions/getBook";
import BookClient from "./BookClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  bookId: string;
}

const Book = async ({ params }: { params: IParams }) => {
  const book = await getBook(params.bookId);
  const currentUser = await getCurrentUser();

  return (
    <>
      <BookClient book={book} currentUser={currentUser} />
    </>
  );
};

export default Book;

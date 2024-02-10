import React from "react";
import { getBook } from "@/actions/getBook";
import BookClient from "./BookClient";

interface IParams {
  bookId?: any;
}

const Book = async ({ params }: { params: IParams }) => {
  const book = await getBook(params.bookId);

  return (
    <>
     <BookClient book={book}/> 
    </>
  );
};

export default Book;

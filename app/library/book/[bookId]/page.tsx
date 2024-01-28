import React from "react";
import Wrapper from "@/app/components/Wrapper";
import { getBook } from "@/actions/getBook";
import BookClient from "./BookClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getAllBooks } from "@/actions/getAllBooks";

interface IParams {
  bookId?: any;
}

const Book = async ({ params }: { params: IParams }) => {
  const books = await getAllBooks();

  return (
    <>
     <BookClient books={books} params={params}/> 
    </>
  );
};

export default Book;

import React from "react";
import Wrapper from "@/app/components/Wrapper";
import { getBook } from "@/actions/getBook";
import BookClient from "./BookClient";

interface IParams {
  bookId?: any;
}

const Product = async ({ params }: { params: IParams }) => {
  const book: any = await getBook(params.bookId);

  return (
    <>
     <BookClient book={book}/> 
    </>
  );
};

export default Product;

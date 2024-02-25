import React from "react";
import UpdateProgressClient from "./UpdateProgressClient";
import { getBook } from "@/actions/getBook";

interface IParams {
  bookId?: any;
}

const page = async ({ params }: { params: IParams }) => {
  const book = await getBook(params.bookId);
  return <UpdateProgressClient book={book} />;
};

export default page;

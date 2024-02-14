import React from "react";
import Wrapper from "../components/Wrapper";
import LibraryClient from "./LibraryClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getAllBooks } from "@/actions/getAllBooks";

const Library = async({searchParams}: any) => {

  const currentUser = await getCurrentUser()
  const data: any = await getAllBooks(searchParams)

  const books = data?.books
  const totalBooks = data?.totalBooks
  
  return (
    <Wrapper>
      <LibraryClient books={books} totalBooks={totalBooks} />
    </Wrapper>
  );
};

export default Library;

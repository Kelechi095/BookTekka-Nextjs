import React from "react";
import LibraryClient from "./LibraryClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getAllBooks } from "@/actions/getAllBooks";

const Library = async ({ searchParams }: any) => {
  const currentUser = await getCurrentUser();
  const data: any = await getAllBooks(searchParams);

  const books = data?.books;
  const totalBooks = data?.totalBooks;

  return (
    <LibraryClient
      books={books}
      totalBooks={totalBooks}
      currentUser={currentUser}
    />
  );
};

export default Library;

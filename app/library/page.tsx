import React from "react";
import Wrapper from "../components/Wrapper";
import LibraryClient from "./LibraryClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getAllBooks } from "@/actions/getAllBooks";

const Library = async() => {

  const currentUser = await getCurrentUser()
  const books: any = await getAllBooks()
  
  return (
    <Wrapper>
      <LibraryClient books={books}/>
    </Wrapper>
  );
};

export default Library;

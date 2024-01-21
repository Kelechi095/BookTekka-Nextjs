"use client";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const LibraryClient = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookData, setBookData] = useState<[] | null>([]);

  const debouncedValue = useDebounce(500, searchTerm);

  const getBookData = useCallback(async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${debouncedValue}&key=${process.env.NEXT_PUBLIC_BOOKS_API}`
    );
    setBookData(response.data);
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue.length > 0) {
      getBookData();
    } 
  }, [debouncedValue]);

  console.log(debouncedValue);
  console.log(bookData)

  return (
    <div>
      <h2 className="font-semibold">Library</h2>
      <input
        type="text"
        className="border p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      {bookData?.items?.map((book: any, index: number) => {
        return (
          <div key={index}>
            <p>{book?.volumeInfo.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LibraryClient;

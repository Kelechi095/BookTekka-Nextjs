"use client";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Wrapper from "@/app/components/Wrapper";
import { NewBookType } from '@/app/zustand/store';
import useNewBook from '@/app/hooks/useNewBook';

export type BookImage = {
  thumbnail: string;
  smallThumbnail: string;
};

export type BookType = {
  title: string;
  authors: string[]
  description: string;
  imageLinks: BookImage;
};

export type BookItemType = {
  volumeInfo: BookType;
};

export type BookDataType = {
  items: BookItemType[];
};

interface SearchNewBookProps {
    setNewBook: React.Dispatch<React.SetStateAction<NewBookType | null>>
}


const AddBook = ({setNewBook}: SearchNewBookProps) => {

const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookData, setBookData] = useState<BookDataType | null>(null);

  const router = useRouter();

  const debouncedValue = useDebounce(500, searchTerm);

  const {handleSetNewBook} = useNewBook()

  const getBookData = useCallback(async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${debouncedValue}&key=${process.env.NEXT_PUBLIC_BOOKS_API}`
    );
    setBookData(response.data);
  }, [debouncedValue]);

  console.log(bookData)

  useEffect(() => {
    if (debouncedValue.length > 0) {
      getBookData();
    }
  }, [debouncedValue, getBookData]);

    const getBookInfo = (arg: BookItemType) => {
        const info = {
          title: arg.volumeInfo.title,
          author: arg.volumeInfo.authors[0],
          thumbnail: arg.volumeInfo.imageLinks.thumbnail,
          smallThumbnail: arg.volumeInfo.imageLinks.smallThumbnail,
          description: arg.volumeInfo.description,
        };
    
        handleSetNewBook(info);
        console.log(info)
        router.push("/library/book-boarding");
      };
    
  return (
    <Wrapper>
      <h2 className="font-normal">Search for book</h2>
      <input
        type="text"
        placeholder="Search book"
        className="border p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
        {bookData?.items?.map((book: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => getBookInfo(book)}
              className="border shadow-sm p-2 rounded cursor-pointer hover:scale-100"
            >
              <Image
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt="book image"
                width="0"
                height="0"
                sizes="100vw"
                className="w-[80px]"
              />
              <p className="text-sm mt-2">{book?.volumeInfo.title}</p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  )
}

export default AddBook
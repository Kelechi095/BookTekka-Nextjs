"use client";

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import Wrapper from "../components/Wrapper";
import Link from "next/link";
import Image from "next/image";
import { getDate } from "../utils/dateMaker";
import {
  BiChevronRight,
  BiSolidBookAlt,
  BiSolidBookReader,
} from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import useBookModal from "../hooks/useBookModal";
import Search from "../components/Search";
import SortFilter from "../components/SortFilter";

const LibraryClient = ({ books }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const router = useRouter();

  const handleSort = () => {};

  const handleStatus = () => {};

  const toggleFilterBar = () => {
    setIsFilter(!isFilter);
  };

  const toggleSortBar = () => {
    setIsSort(!isSort);
  };

  const { handleCloseDeleteModal } = useBookModal();

  useEffect(() => {
    handleCloseDeleteModal();
  }, [handleCloseDeleteModal]);

  if (books?.length) {
    return (
      <Wrapper>
        <h2 className="hidden lg:block text-center text-3xl py-2 px-4 font-semibold uppercase font-mono text-neutral-500">
          Library
        </h2>

        <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

        <SortFilter
          isSort={isSort}
          isFilter={isFilter}
          handleSort={handleSort}
          handleStatus={handleStatus}
          toggleFilterBar={toggleFilterBar}
          toggleSortBar={toggleSortBar}
        />
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-6 mt-4">
          {books?.map((book: any) => (
            <Link href={`/library/book/${book.id}`} key={book.id}>
              <div className=" border-2 rounded p-2 shadow-sm flex items-center gap-2 justify-between bg-white h-40 lg:h-48">
                <div className="flex gap-2 items-center">
                  <Image
                    src={book.smallThumbnail}
                    alt={book.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-20 md:w-24"
                  />
                  <div>
                    <p className="text-sm lg:text-[15px] font-bold text-slate-800">
                      {book.title}
                    </p>
                    <p className="text-xs lg:text-sm font-medium text-slate-900">
                      {book.author}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      {book.genre}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      {getDate(book.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={
                      book.status === "Reading"
                        ? " text-blue-500"
                        : book.status === "Unread"
                        ? " text-red-500"
                        : " text-green-500"
                    }
                  >
                    {book.status === "Reading" ? (
                      <BiSolidBookReader size={20} />
                    ) : book.status === "Unread" ? (
                      <BiSolidBookAlt size={20} />
                    ) : (
                      <FaBook size={20} />
                    )}
                  </p>
                  <BiChevronRight className="text-blue-400" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    );
  } else {
    return (
      <div
        className="
          flex flex-col items-center mt-40 gap-8 text-lg md:text-2xl"
      >
        <h1>Your currently have no books in your library</h1>

        <div className=" md:w-[400px]">
          <Button
            outline
            label="Create a library"
            onClick={() => router.push("/library/add-book")}
          />
        </div>
      </div>
    );
  }
};

export default LibraryClient;

"use client";

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
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
import qs from "query-string";
import Pagination from "../components/Pagination";
import SortStatus from "../components/SortStatus";
import UiLoader from "../components/UiLoader";

const LibraryClient = ({ books, totalBooks, currentUser }: any) => {
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const pageQueryTerm = pageQuery ? Number(pageQuery) : 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    pageQueryTerm ? pageQueryTerm : 1
  );
  const [sortTerm, setSortTerm] = useState("Newest");
  const [statusTerm, setStatusTerm] = useState("All");

  const searchParam = searchParams.get("searchTerm")
  const pageParam = searchParams.get("page")
  const sortParam = searchParams.get("sort")
  const genreParam = searchParams.get("page")



  const numOfPages = Math.ceil(totalBooks / 4);

  const router = useRouter();

  const toggleSortBar = () => {
    setIsSort(!isSort);
  };

  const toggleStatusBar = () => {
    setIsStatus(!isStatus);
  };

  //PAGINATION

  const handlePageNext = () => {
    if (currentPage < numOfPages) {
      setCurrentPage((prev) => prev + 1);
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        page: currentPage + 1,
      };

      const url = qs.stringifyUrl(
        {
          url: "/library/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  };

  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        page: currentPage - 1,
      };

      const url = qs.stringifyUrl(
        {
          url: "/library/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  };

  const clickPaginate = (value: any) => {
    setCurrentPage(value);
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      page: value,
    };

    const url = qs.stringifyUrl(
      {
        url: "/library/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  const handleSort = (arg: any) => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      sort: arg,
      page: 1,
    };

    const url = qs.stringifyUrl(
      {
        url: "/library",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setCurrentPage(1);
    router.push(url);
  };
  const handleStatus = (arg: any) => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      status: arg,
      page: 1,
    };

    const url = qs.stringifyUrl(
      {
        url: "/library/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setCurrentPage(1);
    router.push(url);
  };

  const handleSearch = () => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      searchTerm: searchTerm,
      page: 1,
    };

    const url = qs.stringifyUrl(
      {
        url: "/library/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setCurrentPage(1);
    router.push(url);
  };

  const pagArrayLength = numOfPages + 1;

  const { handleCloseDeleteModal } = useBookModal();

  useEffect(() => {
    handleCloseDeleteModal();
  }, [handleCloseDeleteModal]);


  
  useEffect(() => {
    if(!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])
  
  if(!books) return <UiLoader />
  

  return (
    <Wrapper>


      
      {totalBooks > 0 || searchParam || pageParam || sortParam || genreParam ? (
        <Search
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          searchType="library"
        />
      ): null}

      {totalBooks > 0 || searchParam || pageParam || sortParam || genreParam ? (
        <SortStatus
          isSort={isSort}
          isStatus={isStatus}
          toggleStatusBar={toggleStatusBar}
          toggleSortBar={toggleSortBar}
          handleSort={handleSort}
          handleStatus={handleStatus}
          sortTerm={sortTerm}
          setSortTerm={setSortTerm}
          statusTerm={statusTerm}
          setStatusTerm={setStatusTerm}
        />
      ): null}


      <div>
        {totalBooks < 1 && searchParam || totalBooks < 1 && pageParam || totalBooks < 1 && sortParam || totalBooks < 1 && genreParam ? (
        <div className="h-60 w-full flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">
              No search results found
            </h2>
          </div>
          
        ) : totalBooks < 1 && !searchParam || totalBooks < 1 && !pageParam || totalBooks < 1 && !genreParam ? (
          <div
            className="
          flex flex-col items-center mt-24 gap-8 text-lg md:text-2xl"
          >
            <h1>You currently have no books in your library</h1>

            <div className=" md:w-[400px]">
              <Button
                outline
                label="Create a library"
                onClick={() => router.push("/library/add-book")}
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {totalBooks > 0 && (
        <Pagination
          books={books}
          totalBooks={totalBooks}
          handlePageNext={handlePageNext}
          handlePagePrev={handlePagePrev}
          currentPage={currentPage}
          pagArrayLength={pagArrayLength}
          clickPaginate={clickPaginate}
          pageQueryTerm={pageQueryTerm}
        />
      )}
    </Wrapper>
  );
};

export default LibraryClient;

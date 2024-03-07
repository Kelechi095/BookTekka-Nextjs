"use client";

import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import RecommendationList from "./components/RecommendationList";
import Search from "./components/Search";
import SortGenre from "./components/SortGenre";
import qs from "query-string";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Pagination from "./components/Pagination";
import { BookType } from "@/types";

const HomeClient = ({
  recommendations,
  currentUser,
  totalRecommendations,
}: any) => {
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const pageQueryTerm = pageQuery ? Number(pageQuery) : 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    pageQueryTerm ? pageQueryTerm : 1
  );
  const [sortTerm, setSortTerm] = useState("Likes");
  const [genreTerm, setGenreTerm] = useState("All");

  const numOfPages = Math.ceil(totalRecommendations / 20);

  const router = useRouter();

  const toggleFilterBar = () => {
    setIsFilter(!isFilter);
  };

  const toggleSortBar = () => {
    setIsSort(!isSort);
  };

  //PAGINATION

  const handlePageNext = useCallback(() => {
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
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [currentPage, numOfPages, router, searchParams]);

  const handlePagePrev = useCallback(() => {
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
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [currentPage, router, searchParams]);

  const clickPaginate = useCallback(
    (value: number) => {
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
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    },
    [router, searchParams]
  );

  //SORT

  const handleSort = useCallback(
    (arg: string) => {
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
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      setCurrentPage(1);
      router.push(url);
    },
    [router, searchParams]
  );

  //FILTER

  const handleGenre = useCallback(
    (arg: string) => {
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        genre: arg,
        page: 1,
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      setCurrentPage(1);
      router.push(url);
    },
    [router, searchParams]
  );

  // SEARCH

  const handleSearch = useCallback(() => {
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
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setCurrentPage(1);
    setSearchTerm("");
    router.push(url);
  }, [router, searchParams, searchTerm]);

  const pagArrayLength = numOfPages + 1;

  if (currentUser && currentUser?.username === null) redirect("/newUser");

  return (
    <Wrapper>
      <Search
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchType=""
      />

      <SortGenre
        isSort={isSort}
        isFilter={isFilter}
        toggleFilterBar={toggleFilterBar}
        toggleSortBar={toggleSortBar}
        handleSort={handleSort}
        handleGenre={handleGenre}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
        genreTerm={genreTerm}
        setGenreTerm={setGenreTerm}
      />

      <section>
        {totalRecommendations < 1 ? (
          <div className="h-60 w-full flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Search result not found</h2>
          </div>
        ) : !searchParams && totalRecommendations < 1 ? (
          <div className=" w-full h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">No recommendations</h2>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-6 mt-4">
            {recommendations?.map((book: BookType) => (
              <div key={book.id}>
                <RecommendationList book={book} currentUser={currentUser} />
              </div>
            ))}
          </div>
        )}
      </section>
      {totalRecommendations < 1 ? null : (
        <Pagination
          totalBooks={totalRecommendations}
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

export default HomeClient;

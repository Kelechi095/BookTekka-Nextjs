"use client";

import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import RecommendationList from "./components/RecommendationList";
import Search from "./components/Search";
import SortGenre from "./components/SortGenre";
import qs from "query-string";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type ReviewType = {
  id: string;
  userId: string;
  recommendationId: string;
  review: string;
  reviewerName: string;
  reviewerImage: string;
};

type RecommendationType = {
  id: string;
  title: string;
  author: string;
  description: string;
  posterId: string;
  posterImage: string;
  poster: string;
  likes: number;
  likers: string[];
  thumbnail: string;
  smallThumbnail: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
  reviews: ReviewType[];
};

interface HomeClientProps {
  recommendations: RecommendationType[];
  currentUser: any;
}

const HomeClient = ({ recommendations, totalPages, hasNextPage currentUser }: HomeClientProps) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState()

  const params = useSearchParams();
  const router = useRouter();

  const toggleFilterBar = () => {
    setIsFilter(!isFilter);
  };

  const toggleSortBar = () => {
    setIsSort(!isSort);
  };

  const handleSort = useCallback(
    (arg: string) => {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        sort: arg,
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
      console.log("url", url);
    },
    [router, params]
  );

  const handleGenre = useCallback(
    (arg: string) => {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        genre: arg,
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
    [router, params]
  );

  const handleSearch = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      searchTerm: searchTerm,
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
  }, [router, params, searchTerm]);

  const clickPaginate = () => {
    
  }
  const handlePagePrev = () => {

  }
  const handlePageNext = () => {

  }

  useEffect(() => {
      handleSearch();
  }, [searchTerm, handleSearch]);

  return (
    <Wrapper>
      <h1 className="text-lg font-semibold">Recommendations</h1>

      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <SortGenre
        isSort={isSort}
        isFilter={isFilter}
        toggleFilterBar={toggleFilterBar}
        toggleSortBar={toggleSortBar}
        handleSort={handleSort}
        handleGenre={handleGenre}
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-4">
        {recommendations?.map((book: RecommendationType) => (
          <RecommendationList
            book={book}
            currentUser={currentUser}
            key={book.id}
          />
        ))}
      </div>
      <Pagination
            data={recommendations}
            currentPage={currentPage}
            handlePageNext={handlePageNext}
            handlePagePrev={handlePagePrev}
            pagArrayLength={totalPages}
            clickPaginate={clickPaginate}
          />
    </Wrapper>
  );
};

export default HomeClient;

/* 

*/

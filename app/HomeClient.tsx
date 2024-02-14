"use client";

import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import RecommendationList from "./components/RecommendationList";
import Search from "./components/Search";
import SortGenre from "./components/SortGenre";
import qs from "query-string";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Pagination from "./components/Pagination";
import { stringify } from "querystring";

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

const HomeClient = ({
  recommendations,
  currentUser,
  totalRecommendations,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageQueryTerm, setPageQueryTerm] = useState(1);
  const [sortTerm, setSortTerm] = useState("Newest");
  const [genreTerm, setGenreTerm] = useState("All");

  const searchParams = useSearchParams();

  const router = useRouter();

  const toggleFilterBar = () => {
    setIsFilter(!isFilter);
  };

  const toggleSortBar = () => {
    setIsSort(!isSort);
  };

  //PAGINATION

  const handlePageNext = () => {
    if (currentPage < totalRecommendations) {
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
          url: "/",
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
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setCurrentPage(1);
    router.push(url);
  };
  const handleGenre = (arg: any) => {
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
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      setCurrentPage(1);
      router.push(url);
  };

  
  const pagArrayLength = totalRecommendations + 1;

  return (
    <Wrapper>
      <h1 className="text-lg font-semibold">Recommendations</h1>

      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} handleSearch={handleSearch} />

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
        recommendations={recommendations}
        totalRecommendations={totalRecommendations}
        handlePageNext={handlePageNext}
        handlePagePrev={handlePagePrev}
        currentPage={currentPage}
        pagArrayLength={pagArrayLength}
        clickPaginate={clickPaginate}
        pageQueryTerm={pageQueryTerm}
      />
    </Wrapper>
  );
};

export default HomeClient;

/* 

*/

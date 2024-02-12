"use client"

import { useEffect, useState } from "react";
import { filterGenres, filterGenres2, sortButtons } from "../utils/buttons";

import { BiSolidChevronDown, BiSolidChevronRight } from "react-icons/bi";

export default function SortGenre({
  isSort,
  isFilter,
  handleSort,
  handleGenre,
  toggleSortBar,
  toggleFilterBar,
  setCurrentPage
}: any) {
  
  const [sortTitle, setSortTitle] = useState("Sort");
  const [filterTitle, setFilterTitle] = useState("Filter");
  const [sortTerm, setSortTerm] = useState("Newest");
  const [genreTerm, setGenreTerm] = useState("All");

  useEffect(() => {
    setSortTitle(sortTerm);
    setFilterTitle(genreTerm);
  }, [genreTerm, sortTerm]);

  useEffect(() => {
    setCurrentPage(1)
  }, [sortTerm, genreTerm, setCurrentPage])
  
  return (
    <div className="sort_filter relative flex justify-between my-6">
      <div
        className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
        onClick={toggleSortBar}
      >
        <p className="text-sm lg:text-base">{sortTitle}</p>
        {isSort ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isSort && (
        <ul className="absolute top-12 bg-white w-36 px-2 py-1 rounded shadow-sm border z-10 text-sm lg:text-base">
          {sortButtons.map((button, index) => (
            <li
              key={index}
              className={
                sortTerm === button
                  ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                  : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
              }
              onClick={() => {
                setSortTerm(button);
                toggleSortBar();
                handleSort(button)
              }}
            >
              {button}
            </li>
          ))}
        </ul>
      )}
      <div
        className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
        onClick={toggleFilterBar}
      >
        <p className="text-sm lg:text-base">{filterTitle}</p>
        {isFilter ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isFilter && (
        <ul className="absolute top-12 right-0 bg-white w-36 px-2 py-1 rounded shadow-sm border z-10 text-sm lg:text-base">
          {filterGenres2.map((button, index) => (
            <li
              key={index}
              className={
                genreTerm === button
                  ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                  : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
              }
              onClick={() => {
                setGenreTerm(button);
                toggleFilterBar();
                handleGenre(button)
              }}
            >
              {button}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

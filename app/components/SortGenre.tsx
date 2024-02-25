import { useEffect, useState } from "react";
import { filterGenres2, sortButtons } from "../utils/buttons";

import { BiSolidChevronDown, BiSolidChevronRight } from "react-icons/bi";
import { useSearchParams } from "next/navigation";

interface SortGenreProps {
  sortTerm: string;
  genreTerm: string;
  isSort: boolean;
  isFilter: boolean;
  toggleSortBar: () => void;
  toggleFilterBar: () => void;
  handleGenre: (arg: string) => void;
  handleSort: (arg: string) => void;
  setGenreTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SortGenre({
  sortTerm,
  genreTerm,
  isSort,
  isFilter,
  handleSort,
  handleGenre,
  toggleSortBar,
  toggleFilterBar,
  setSortTerm,
  setGenreTerm,
}: SortGenreProps) {
  const params = useSearchParams();
  const [sortTitle, setSortTitle] = useState(
    params.get("sort") ? params.get("sort") : "Likes"
  );
  const [filterTitle, setFilterTitle] = useState(
    params.get("genre") ? params.get("genre") : "All"
  );

  useEffect(() => {
    setSortTitle(params.get("sort") ? params.get("sort") : "Likes");
    setFilterTitle(params.get("genre") ? params.get("genre") : "All");
  }, [params]);

  return (
    <div className="sort_filter relative flex justify-between my-6">
      <div
        className="border py-1 px-4 cursor-pointer w-36 md:w-44  rounded flex items-center justify-between"
        onClick={toggleSortBar}
      >
        <p className="text-sm">{sortTitle}</p>
        {isSort ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isSort && (
        <ul className="absolute top-12 bg-white w-36 md:w-44 px-2 py-1 rounded shadow-sm border z-10 text-sm md:text-[15px]">
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
                handleSort(button);
              }}
            >
              {button}
            </li>
          ))}
        </ul>
      )}
      <div
        className="border py-1 px-4 cursor-pointer w-36 md:w-44 rounded flex items-center justify-between"
        onClick={toggleFilterBar}
      >
        <p className="text-sm">{filterTitle}</p>
        {isFilter ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isFilter && (
        <ul className="absolute top-12 right-0 bg-white w-36 md:w-44 px-2 py-1 rounded shadow-sm border z-10 text-sm md:text-[15px]">
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
                handleGenre(button);
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

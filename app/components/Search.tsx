"use client";

import React from "react";

interface SearchBarProps {
  handleSearch: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
}

const SearchBar = ({
  handleSearch,
  setSearchTerm,
  searchType,
}: SearchBarProps) => {
  return (
    <div className="flex items-center justify-center">
      <input
        className="py-[6px] px-2 border border-neutral-400 rounded-l-md focus: outline-none focus:border-[0.5px] max-w-sm md:w-80"
        autoComplete="off"
        type="text"
        placeholder={
          searchType === "library" ? "Search books" : "Search recommendations"
        }
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-neutral-800 hover:opacity-80 text-white py-[7px] px-2  rounded-r-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

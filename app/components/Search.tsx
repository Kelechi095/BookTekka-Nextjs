"use client";

const SearchBar = ({ handleSearch, searchTerm, setSearchTerm, searchType }: any) => {
  return (
    <div className="flex items-center justify-center">
      <input
        className="py-[6px] px-2 border border-neutral-400 rounded-l-md focus: outline-none focus:border-[0.5px] max-w-sm md:w-80"
        autoComplete="off"
        type="text"
        placeholder={searchType === "library" ? "Search books": "Search recommendations"}
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-black hover:opacity-80 text-white py-[7px] px-2  rounded-r-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

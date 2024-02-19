"use client";

const SearchBar = ({ handleSearch, searchTerm, setSearchTerm, searchType }: any) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <input
        className="py-[6px] px-2 border border-gray-300 rounded-l-md focus: outline-none focus:border-[0.5px] focus:border-slate-500 max-w-sm md:w-80"
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

"use client";

const SearchBar = ({ handleSearch, searchTerm, setSearchTerm }: any) => {
  return (
    <div className="flex items-center justify-center">
      <input
        className="p-2 border border-gray-300 rounded-l-md focus: outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
        autoComplete="off"
        type="text"
        placeholder="Search recommendations"
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-cyan-600 hover:opacity-80 text-white p-2 rounded-r-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

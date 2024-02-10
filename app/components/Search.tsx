import { AiOutlineSearch } from "react-icons/ai"

export default function Search({setSearchTerm, searchTerm}) {
  return (
    <div className=" bg-zinc-100 border px-6 lg:mt-4 flex items-center gap-2 rounded-full">
        <AiOutlineSearch className="text-lg lg:text-xl" />
        <input
          type="text"
          className="bg-zinc-100 outline-none px-2 py-[10px] lg:py-1 w-full text-sm lg:text-lg "
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
  )
}

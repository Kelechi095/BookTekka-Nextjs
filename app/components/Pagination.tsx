import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

export default function Pagination({
  recommendations,
  totalRecommendations,
  handlePageNext,
  handlePagePrev,
  currentPage,
  pagArrayLength,
  clickPaginate
}: any) {

  const firstSl = currentPage
  const secondSl = currentPage + 1

  const numOfPages = Math.ceil(totalRecommendations / 4)

  return (
    <div className="flex justify-center md:justify-end items-center gap-8 my-[12px] lg:my-4">
      <button
        className="border shadow-sm flex items-center rounded lg:text-lg text-cyan-500 px-2 bg-white disabled:text-gray-400 cursor-pointer"
        disabled={currentPage === 1 || 0}
        onClick={() => {
          handlePagePrev()
        }}
      >
        Prev
        <BiChevronsLeft size={20} className=" mt-1 " />
      </button>
      
      {[...Array(pagArrayLength).keys()].slice(firstSl, secondSl).map(num => (
        <button className={
          `border rounded px-4
          ${currentPage === num ? "bg-cyan-500 text-white border-cyan-500" : "bg-white text-slate-600"}
          `} key={num} onClick={() => clickPaginate(num)}>{num}</button>
      ))}
      <button
        className="border shadow-sm flex items-center rounded lg:text-lg text-cyan-500 px-2 bg-white disabled:text-gray-400 cursor-pointer"
        disabled={currentPage === numOfPages}
        onClick={() => {
          handlePageNext()
        }}
      >
        Next
        <BiChevronsRight size={20} className="  mt-1 " />
      </button>
    </div>
  );
}

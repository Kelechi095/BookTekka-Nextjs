// @ts-nocheck
"use client"

import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

export default function Pagination({
  totalBooks,
  handlePageNext,
  handlePagePrev,
  currentPage,
  pagArrayLength,
  clickPaginate,
}: any) {
  const numOfPages = Math.ceil(totalBooks / 4);

  const firstSl = currentPage;
  const secondSl = currentPage + 2;

  return (
    <div>
      <div className="flex justify-end items-center gap-4 my-[12px] lg:my-4">
        
        <button
          className="border shadow-sm flex items-center rounded lg:text-lg px-2 bg-white disabled:text-gray-400 cursor-pointer"
          disabled={currentPage === 1 || 0}
          onClick={() => {
            handlePagePrev();
          }}
        >
          Prev
          <BiChevronsLeft size={20} className=" mt-1 " />
        </button>

        {[...Array(pagArrayLength).keys()]
          .slice(firstSl, secondSl)
          .map((num) => (
            <button
              className={`border rounded px-4
          ${
            currentPage === num
              ? "bg-black text-white border-black"
              : "bg-white text-slate-600"
          }
          `}
              key={num}
              onClick={() => clickPaginate(num)}
            >
              {num}
            </button>
          ))}
        <button
          className="border shadow-sm flex items-center rounded lg:text-lg px-2 bg-white disabled:text-gray-400 cursor-pointer"
          disabled={currentPage === numOfPages}
          onClick={() => {
            handlePageNext();
          }}
        >
          Next
          <BiChevronsRight size={20} className="  mt-1 " />
        </button>
      </div>
      <h2 className="text-sm text-end">
          Page {currentPage} of {numOfPages}
        </h2>
    </div>
  );
}

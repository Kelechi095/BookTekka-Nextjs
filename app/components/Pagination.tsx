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
  const numOfPages = Math.ceil(totalBooks / 20);

  const firstSl = currentPage;
  const secondSl = currentPage + 2;


  return (
    <div className="mt-6">
      <div className="flex justify-end items-center gap-4">
        
        <button
          className="border shadow-sm flex items-center rounded lg:text-lg px-2 bg-white disabled:text-gray-400 cursor-pointer"
          disabled={currentPage === 1 || 0}
          onClick={() => {
            handlePagePrev();
          }}
        >
          Prev
          <BiChevronsLeft size={20} className="" />
        </button>

        {[...Array(pagArrayLength).keys()]
          .slice(firstSl, secondSl)
          .map((num) => (
            <button
              className={`border rounded px-4
          ${
            currentPage === num
              ? "bg-neutral-800 text-white border-neutral-800"
              : "bg-white text-neutral-300"
          }
          `}
              key={num}
              onClick={() => clickPaginate(num)}
            >
              {num}
            </button>
          ))}
        <button
          className="border shadow-sm flex items-center rounded lg:text-lg  text-neutral-800 px-2 bg-white disabled:text-gray-400 cursor-pointer"
          disabled={currentPage === numOfPages}
          onClick={() => {
            handlePageNext();
          }}
        >
          Next
          <BiChevronsRight size={20} className=" " />
        </button>
      </div>
      <h2 className="text-sm mt-2 text-end">
          Page {currentPage} of {numOfPages}
        </h2>
    </div>
  );
}

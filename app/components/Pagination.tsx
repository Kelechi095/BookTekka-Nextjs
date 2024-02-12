"use client";

import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

const Pagination = ({
  recommendationsPerPage,
  totalRecommendations,
  paginate,
  currentPage
}: any) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalRecommendations / recommendationsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex gap-2 items-center mt-3">
        {pageNumbers.map((number) => (
          <li key={number} className="">
            <button onClick={() => paginate(number)} className={
                `py-1 px-3 border rounded
                ${currentPage === number ? "bg-blue-400 border-blue-400 text-white" : "bg-white border-blue-400"}
                `
                }>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

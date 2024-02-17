"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function UpdateProgressModal({
  book,
}: any) {
  const [newCurrentPage, setNewCurrentPage] = useState(book?.currentPage);
  const [newTotalPages, setNewTotalPages] = useState(book?.totalPages);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdateProgress = async (e: any) => {
    e.preventDefault()
    const pageData = {
      currentPage: Number(newCurrentPage),
      totalPages: Number(newTotalPages),
    };
    if (pageData.currentPage > pageData.totalPages) {
      return toast.error("Wrong page data");
    } else {
      setIsLoading(true);
      try {
        await axios.patch(`/api/updateProgress/${book.id}`, pageData);
        toast.success("Book progress updated");
        router.push(`/library/book/${book.id}`)
        router.refresh()
        setIsLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  
  return (
    <div>
      <div className="h-50 w-full max-w-xs lg:max-w-sm border bg-white mb-24 p-3 rounded shadow-sm text-sm">
        <form className="grid" onSubmit={handleUpdateProgress}>
          <label>Current Page</label>

          <input
            type="number"
            value={newCurrentPage}
            name="currentPage"
            className="border p-1 outline-none"
            onChange={(e) => setNewCurrentPage(Number(e.target.value))}
          />
          <label className="mt-2">Total Pages</label>
          <input
            type="number"
            className="border p-1 outline-none"
            value={newTotalPages}
            name="totalPages"
            onChange={(e) => setNewTotalPages(Number(e.target.value))}
          />
          <button className="w-fit py-[3px] px-2 border mt-2 bg-blue-500 text-white rounded">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

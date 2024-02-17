"use client";

import useProgressModal from "@/app/hooks/useProgressModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function UpdateProgressModal({
  book,
  currentPage,
  totalPages,
}: any) {
  const [newCurrentPage, setNewCurrentPage] = useState(currentPage.toString());
  const [newTotalPages, setNewTotalPages] = useState(totalPages.toString());
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { handleCloseProgressModal } = useProgressModal();

  const handleUpdateProgress = async (e: any) => {
    e.preventDefault()
    const pageData = {
      currentPage: Number(newCurrentPage),
      totalPages: Number(newTotalPages),
    };
    if (pageData.currentPage > pageData.totalPages) {
      toast.error("Wrong page data");
    } else {
      setIsLoading(true);
      console.log(pageData)
      try {
        await axios.patch(`/api/updateProgress/${book.id}`, pageData);
        toast.success("Book progress updated");
        router.push(`/library/book/${book.id}`)
        router.refresh();
        handleCloseProgressModal
        setIsLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  
  return (
    <div className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center">
      <div className="h-50 w-full max-w-xs lg:max-w-sm border bg-white mb-24 p-3 rounded shadow-sm text-sm">
        <button
          className="px-1 mb-2 text-red-500"
          onClick={handleCloseProgressModal}
        >
          <FaTimes size={22} />
        </button>
        <form className="grid" onSubmit={handleUpdateProgress}>
          <label>Current Page</label>

          <input
            type="text"
            value={newCurrentPage}
            name="currentPage"
            className="border p-1 outline-none"
            onChange={(e) => setNewCurrentPage(e.target.value)}
          />
          <label className="mt-2">Total Pages</label>
          <input
            type="text"
            className="border p-1 outline-none"
            value={newTotalPages}
            name="totalPages"
            onChange={(e) => setNewTotalPages(e.target.value)}
          />
          <button className="w-fit py-[3px] px-2 border mt-2 bg-blue-500 text-white rounded">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

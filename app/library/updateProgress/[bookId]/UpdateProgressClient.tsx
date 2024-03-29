"use client";

import { BookClientType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {useState } from "react";
import toast from "react-hot-toast";

interface UpdateProgressModal {
  book: BookClientType | null
}

export default function UpdateProgressModal({ book }: UpdateProgressModal) {
  const [newCurrentPage, setNewCurrentPage] = useState(book?.currentPage);
  const [newTotalPages, setNewTotalPages] = useState(book?.totalPages);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdateProgress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageData = {
      currentPage: Number(newCurrentPage),
      totalPages: Number(newTotalPages),
    };
    if (
      pageData.currentPage > pageData.totalPages ||
      pageData.currentPage <= 0 ||
      pageData.totalPages <= 0
    ) {
      return toast.error("Wrong page data");
    } else {
      setIsLoading(true);
      try {
        await axios.patch(`/api/updateProgress/${book?.id}`, pageData);
        toast.success("Book progress updated");
        router.push(`/library/book/${book?.id}`);
        router.refresh();
        setIsLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:w-[50%] w-[95%]  mx-auto border bg-white mb-24 p-3 rounded shadow-md text-sm">
        <form className="grid w-full" onSubmit={handleUpdateProgress}>
          <h2 className="font-semibold text-center mb-2">
            Update Book Progress
          </h2>
          <hr className="py-2" />
          <h2 className="font-semibold">Title: {book?.title.slice(0, 20)}</h2>
          <hr className="py-2" />
          <label>Current Page</label>

          <input
            type="number"
            value={newCurrentPage}
            name="currentPage"
            className="border-2 p-1 outline-none"
            onChange={(e) => setNewCurrentPage(Number(e.target.value))}
          />
          <label className="mt-4">Total Pages</label>
          <input
            type="number"
            className="border-2 p-1 outline-none"
            value={newTotalPages}
            name="totalPages"
            onChange={(e) => setNewTotalPages(Number(e.target.value))}
          />
          <button className="border border-neutral-300 py-2 px-4 mt-2 rounded text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300">
            {isLoading ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}

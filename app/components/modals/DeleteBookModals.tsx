"use client";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useBookModal from "@/app/hooks/useBookModal";
import { useRouter } from "next/navigation";

export default function DeleteBookModal({ book }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleCloseDeleteModal } = useBookModal();

  const router = useRouter();

  const handleDeleteBook = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/book/${book.id}`);
      toast.success("Book deleted");
      router.push("/library");
      router.refresh()
      setIsDeleting(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setIsDeleting(false);
    }


  };

  return (
    <div
      className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center"
      onClick={handleDeleteBook}
    >
      <div
        className="h-40 w-full max-w-xs lg:max-w-sm  border bg-white mb-24 p-2 rounded shadow-sm text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="px-1 mb-2 text-red-500"
          onClick={handleCloseDeleteModal}
        >
          <FaTimes size={22} />
        </button>
       {isDeleting && <p className="text-center">Deleting...</p>}
        <p className="text-center text mt-2">
          Are you sure you want to delete this book from your library?
        </p>
        <div className="flex justify-around mt-3">
          <button
            className="border rounded bg-green-400 text-white py-[3px] px-6"
            onClick={handleDeleteBook} >
            Yes
          </button>
          <button
            className="border rounded bg-red-500 text-white py-[3px] p-1 px-6"
            onClick={handleCloseDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

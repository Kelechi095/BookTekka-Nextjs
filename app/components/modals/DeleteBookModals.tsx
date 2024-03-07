"use client";
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
      router.refresh();
      setIsDeleting(false);
    } catch (err) {
      toast.error("Something went wrong");
      setIsDeleting(false);
    }
  };

  return (
    <div
      className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-48 w-[90%] lg:max-w-md  border bg-white  flex flex-col items-center justify-center p-2 rounded shadow-sm text-sm">
        {isDeleting ? (
          <p className="text-center font-semibold">Deleting...</p>
        ) : (
          <p className="text-center text-sm mt-2">
            Are you sure you want to delete this book from your library?
          </p>
        )}

        <div className="flex items-center justify-around mt-6 w-full">
          <button
            className="gap-2 border border-neutral-300 py-2 px-8 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
            onClick={handleDeleteBook}
          >
            Yes
          </button>
          <button
            className="gap-2 border border-neutral-300 py-2 px-8 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
            onClick={handleCloseDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

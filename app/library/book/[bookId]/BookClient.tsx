"use client";

import UiLoader from "@/app/components/UiLoader";
import Wrapper from "@/app/components/Wrapper";
import DeleteBookModal from "@/app/components/modals/DeleteBookModals";
import UpdateProgressModal from "@/app/components/modals/UpdateProgressModal";
import useBookModal from "@/app/hooks/useBookModal";
import useProgressModal from "@/app/hooks/useProgressModal";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidBookAlt, BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { TbDropletHalf2Filled } from "react-icons/tb";

const BookClient = ({ book, currentUser }: any) => {
  const [isFull, setIsFull] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);

  const { handleOpenDeleteModal, handleCloseDeleteModal, isDeleteModalOpen } =
    useBookModal();
  const { handleOpenProgressModal, isProgressModalOpen } = useProgressModal();

  const router = useRouter();

  const handleShowMore = () => {
    setIsFull(!isFull);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const bookInfo = {
      title: book.title,
      author: book.author,
      description: book.description,
      smallThumbnail: book.smallThumbnail,
      thumbnail: book.thumbnail,
      genre: book.genre,
    };
    try {
      setIsRecommending(true);
      await axios.post("/api/recommendation", bookInfo);
      toast.success("book added to Recommendations");
      setIsRecommending(false);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
      setIsRecommending(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!book) return <UiLoader />;

  return (
    <Wrapper>
      <div>
        <div className="lg:grid-cols-10 grid gap-4 border-b mb-1 py-4 px-1">
          {isDeleteModalOpen && <DeleteBookModal book={book} />}

          <div className="col-span-3">
            <Image
              src={book?.thumbnail}
              alt={book?.title}
              width="0"
              height="0"
              sizes="100vw"
              className="w-40 md:w-44"
            />
          </div>
          <div className="col-span-7">
            <h2 className="text-lg lg:text-2xl font-bold mt-2">
              {book?.title}
            </h2>
            <h2 className="text-sm lg:text-base font-semibold">
              <span className="font-bold">Author: </span>
              {book?.author}
            </h2>
            <h2 className="text-sm lg:text-base font-semibold">
              <span className="font-bold">Genre: </span>
              {book?.genre}
            </h2>
            {book?.description && (
              <h2 className="text-sm font-base">
                <span className="font-bold">Description: </span>{" "}
                {isFull ? book.description : book.description.slice(0, 570)}
                {isFull ? "" : "..."}
                <button
                  className="text-blue-500 underline ml-2"
                  onClick={handleShowMore}
                >
                  {isFull ? "Show less" : "Show more"}
                </button>
              </h2>
            )}
            <div className="my-4 flex gap-2">
              <Link href={`/library/edit-book/${book.id}`}>
                <button className="flex items-center gap-2 border border-neutral-300 py-2 px-2 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300">
                  <BiSolidEditAlt size={20} />
                  Edit
                </button>
              </Link>
              <button
                className=" flex items-center gap-2 border border-neutral-300 py-2 px-2 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
                onClick={handleOpenDeleteModal}
              >
                <BsFillTrashFill size={18} />
                Delete
              </button>
              <button
                className="flex items-center gap-2 border border-neutral-300 py-2 px-2 rounded-full text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
                onClick={handleSubmit}
              >
                <FaEye size={18} />
                {isRecommending ? "Submitting" : "Recommend"}
              </button>
            </div>
            {book?.status === "Reading" && (
              <button
                className="flex items-center gap-2 border border-neutral-300 py-2 px-2 rounded text-sm font-semibold self-center hover:bg-neutral-200 transition duration-300"
                onClick={() =>
                  router.push(`/library/updateProgress/${book.id}`)
                }
              >
                {book?.progress > 0 ? "Update progress" : "Monitor progress"}
              </button>
            )}
          </div>
        </div>

        {book?.status === "Reading" && book.progress > 0 ? (
          <div className="my-2 gap-2 lg:grid lg:grid-cols-2">
            <div className="border border-b-[6px] shadow-sm  border-b-black rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl ">
                  {book.progress}%
                </p>
                <CgSandClock size={30} className="" />
              </div>
              <p className="font-semibold text-lg">
                Reading Progress
              </p>
            </div>
            <div className="border border-b-[6px] shadow-sm  border-b-black rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">
                  {book.currentPage}
                </p>
                <FaBookOpen size={30} />
              </div>
              <p className="font-semibold text-lg">
                Current Page
              </p>
            </div>
            <div className="border border-b-[6px]  border-b-black rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">
                  {book.totalPages}
                </p>
                <BiSolidBookAlt size={30} className="" />
              </div>
              <p className="font-semibold text-lg">Total Pages</p>
            </div>
            <div className="border border-b-[6px] border-b-black rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">
                  {book.pagesRemaining}
                </p>
                <TbDropletHalf2Filled size={30} className="" />
              </div>
              <p className="font-semibold text-lg">
                Pages Remaining
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default BookClient;

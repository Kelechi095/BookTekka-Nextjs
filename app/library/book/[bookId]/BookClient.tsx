"use client";

import Wrapper from "@/app/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";


const BookClient = ({ book }: any) => {
    const [isFull, setIsFull] = useState(false);

    const handleShowMore = () => {
        setIsFull(!isFull);
      };

      console.log(book)

      
  return (
    <Wrapper>
      <div className="lg:grid-cols-10 grid gap-4 border-b mb-1 p-4">
        <div className="col-span-3">
          <Image
            src={book?.thumbnail}
            alt={book?.title}
            width="0"
            height="0"
            sizes="100vw"
            className="w-20 md:w-24"
          />
        </div>
        <div className="col-span-7">
          <h2 className="text-lg lg:text-2xl font-bold mt-2">{book?.title}</h2>
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
              <button
                className="text-white flex items-center gap-1 bg-blue-500 rounded text-xs border py-[6px] px-2 cursor-pointer"
              >
                <BiSolidEditAlt size={20}/>
                Edit
              </button>
            </Link>
            {/* <button
              size={18}
              className="text-white flex gap-1 items-center bg-red-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
              onClick={handleShowDeleteModal}
            >
              <BsFillTrashFill />
              Delete
            </button> */}
            {/* <button
              
              className="text-white flex gap-1 items-center bg-green-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
              onClick={() => console.log('submitting some shit')}
            >
              <IoEyeSharp size={18}/>
              {isRecommending ? "Submitting" : "Recommend"}
            </button> */}
          </div>
          {book?.status === "Reading" && (
            <button
              className="flex border-cyan-500 gap-1 items-center bg-white text-cyan-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
              /* onClick={handleShowProgressModal} */
            >
              {book?.progress > 0 ? "Update progress" : "Monitor progress"}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default BookClient;

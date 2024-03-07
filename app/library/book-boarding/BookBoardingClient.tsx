"use client";

import Wrapper from "@/app/components/Wrapper";
import useNewBook from "@/app/hooks/useNewBook";
import { filterGenres, statusOptions2 } from "@/app/utils/buttons";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface currentUserProps {
  currentUser: SafeUser | null
}

const BookBoardingClient = ({currentUser}: currentUserProps) => {
  const { newBook } = useNewBook();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    thumbnail: "",
    smallThumbnail: "",
    genre: "",
    status: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    formData.title = newBook.title;
    formData.author = newBook.author;
    formData.description = newBook.description;
    formData.thumbnail = newBook.thumbnail;
    formData.smallThumbnail = newBook.smallThumbnail;

    try {
      setIsSubmitting(true);
      await axios.post("/api/book", formData);
      console.log(formData)
      toast.success("Book added to library");
      setIsSubmitting(false);
      router.push("/library");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if(!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])


  return (
    <Wrapper>
      <Image
        src={newBook?.thumbnail}
        alt={newBook?.title}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[150px] mx-auto"
      />
      <p className="text-md font-semibold text-center">{newBook?.title}</p>
      <p className="text-sm font-semibold text-center">{newBook?.author}</p>
      <form
        className=" bg-white py-8 my-6 shadow-sm rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg text-center font-semibold text-slate-800">
          Complete Book Details
        </h1>
        <div className="grid gap-4 p-4 w-full max-w-xs lg:max-w-lg mx-auto">
          <select
            name="genre"
            value={formData.genre}
            className="text-sm  text-slate-800 outline-none border-t px-1 py-2 bg-zinc-100 cursor-pointer"
            onChange={handleChange}
          >
            {filterGenres.map((genre, index) => (
              <option key={index}>{genre}</option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            className="text-sm text-slate-800 bg-zinc-100 px-1 py-2 outline-none border-t cursor-pointer"
            onChange={handleChange}
          >
            {statusOptions2.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>

          <button className="border w-full px-4 rounded text-white p-1 bg-blue-500">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default BookBoardingClient;

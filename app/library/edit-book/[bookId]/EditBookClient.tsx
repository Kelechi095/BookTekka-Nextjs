"use client";

import Wrapper from "@/app/components/Wrapper";
import { filterGenres, statusOptions2 } from "@/app/utils/buttons";
import { BookClientType } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface EditBookClient {
  book: BookClientType | null
}

const EditBookClient = ({ book }: EditBookClient) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    genre: book?.genre,
    status: book?.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.status === "Status") {
      return toast.error("Wrong status data");
    }
    if (formData.genre === "Genre") {
      return toast.error("Wrong genre data");
    }
    try {
      setIsEditing(true);
      await axios.patch(`/api/book/${book?.id}`, formData);
      toast.success("Book edited");
      setIsEditing(false);
      router.push("/library");
      router.refresh();
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
      console.log(err);
      setIsEditing(false);
    }
  };

  return (
    <Wrapper>
      {book && <Image
        src={book?.thumbnail}
        alt={book.title}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[150px] mx-auto"
      />}
      <p className="text-md font-semibold text-center">{book?.title}</p>
      <p className="text-sm font-semibold text-center">{book?.author}</p>
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
            {isEditing ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditBookClient;

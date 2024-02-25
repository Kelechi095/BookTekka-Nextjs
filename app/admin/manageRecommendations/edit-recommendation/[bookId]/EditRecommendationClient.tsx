"use client";

import Wrapper from "@/app/components/Wrapper";
import { filterGenres, statusOptions2 } from "@/app/utils/buttons";
import { RecommendationsType } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface RecommendationsProps {
  recommendation: RecommendationsType | null;
}

const EditRecommendationClient = ({ recommendation }: RecommendationsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    genre: recommendation?.genre,
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.genre === "Genre") {
      return toast.error("Wrong genre data");
    }
    try {
      setIsEditing(true);
      await axios.patch(`/api/recommendation/${recommendation?.id}`, formData);
      toast.success("Recommendation edited");
      setIsEditing(false);
      router.push("/admin/manageRecommendations");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
      setIsEditing(false);
    }
  };

  return (
    <Wrapper>
      {recommendation && (
        <Image
          src={recommendation.thumbnail}
          alt={recommendation?.title}
          width="0"
          height="0"
          sizes="100vw"
          className="w-[150px] mx-auto"
        />
      )}
      <p className="text-md font-semibold text-center">
        {recommendation?.title}
      </p>
      <p className="text-sm font-semibold text-center">
        {recommendation?.author}
      </p>
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

          <button className="border w-full px-4 rounded text-white p-1 bg-blue-500">
            {isEditing ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditRecommendationClient;

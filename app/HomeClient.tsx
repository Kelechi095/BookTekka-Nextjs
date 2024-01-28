"use client";

import React from "react";
import Wrapper from "./components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { getDate } from "./utils/dateMaker";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import RecommendationList from "./components/RecommendationList";

type ReviewType = {
  id: string;
  userId: string;
  recommendationId: string;
  review: string;
  reviewerName: string;
  reviewerImage: string;
};

type RecommendationType = {
  id: string;
  title: string;
  author: string;
  description: string;
  posterId: string;
  posterImage: string;
  poster: string;
  likes: number;
  likers: string[];
  thumbnail: string;
  smallThumbnail: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
  reviews: ReviewType[];
};

interface HomeClientProps {
  recommendations: RecommendationType[];
  currentUser: any;
}

const HomeClient = ({ recommendations, currentUser}: HomeClientProps) => {
  

  return (
    <Wrapper>
      <h1 className="text-lg font-semibold">Recommendations</h1>

      <div className="grid lg:grid-cols-2 gap-6 mt-4">
        {recommendations?.map((book: RecommendationType) => (
          <RecommendationList book={book} currentUser={currentUser} key={book.id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default HomeClient;

/* 

*/

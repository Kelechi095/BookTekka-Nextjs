"use client";

import Wrapper from "@/app/components/Wrapper";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { noUser } from "@/app/utils/noUser";
import Link from "next/link";
import { ReviewType } from "@/types";

const RecommendationClient = ({ currentUser, recommendation, review }: any) => {
  const [isFull, setIsFull] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleShowMore = () => {
    setIsFull(!isFull);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/reviews", {
        review: userReview,
        recommendationId: recommendation.id,
      });
      toast.success("Review added");
      router.refresh();
      setIsSubmitting(false);
      setUserReview("");
    } catch (err) {
      toast.error("Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div>
        <section>
          <div className="lg:grid-cols-10 grid gap-4 border-b mb-1 py-4">
            <div className="col-span-3">
              <Image
                src={recommendation?.thumbnail}
                alt={recommendation?.title}
                width="0"
                height="0"
                sizes="100vw"
                className="w-40 lg:w-44 rounded"
              />
            </div>
            <div className="col-span-7">
              {
                <h2 className="text-lg lg:text-2xl font-bold mt-2">
                  {recommendation?.title}
                </h2>
              }
              <h2 className="text-sm lg:text-base font-semibold">
                <span className="font-bold">Author: </span>
                {recommendation?.author}
              </h2>
              <h2 className="text-sm lg:text-base font-semibold">
                <span className="font-bold">Genre: </span>
                {recommendation?.genre}
              </h2>

              <h2 className="text-sm font-base">
                <span className="font-bold">Description: </span>{" "}
                {isFull
                  ? recommendation?.description
                  : recommendation?.description.slice(0, 570)}
                {recommendation?.description.length >= 570 && isFull
                  ? ""
                  : recommendation?.description.length < 570 && isFull
                  ? ""
                  : recommendation?.description.length < 570 && !isFull
                  ? ""
                  : "..."}
                {recommendation?.description.length >= 570 && (
                  <button
                    className="text-blue-500 underline ml-2"
                    onClick={handleShowMore}
                  >
                    {isFull ? "Show less" : "Show more"}
                  </button>
                )}
              </h2>
            </div>
          </div>
          {recommendation && currentUser ? (
            <form onSubmit={handleSubmit}>
              <textarea
                cols={10}
                rows={5}
                className="border w-full max-w-xs lg:max-w-lg outline-none block p-2 text-sm mt-4 mb-1"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              ></textarea>
              <button className="text-sm border mb-4 mt-1 rounded p-1 bg-cyan-600 text-white">
                {isSubmitting ? "Submitting" : "Add review"}
              </button>
            </form>
          ) : null}
          {review?.length > 0 && (
            <div>
              <h2 className="mt-4 font-semibold text-blue-400 mx-2">
                {review?.length > 0 ? "Reviews" : "No reviews"}
              </h2>
              {review.map((review: ReviewType) => (
                <div
                  key={review.id}
                  className="text-sm w-full max-w-xs lg:max-w-lg p-2 px-2 border shadow-sm mt-3 rounded-lg"
                >
                  <p className="font-semibold text-sm flex items-center gap-3">
                    <Link href={`/globalProfile/${review?.user.id}`}>
                      <Image
                        src={review?.user.image ? review?.user.image : noUser}
                        alt="Poster image"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover"
                      />
                    </Link>
                    <span>{review?.user.username}</span>
                  </p>
                  <p className="text-sm lg:text-sm mt-3">{review?.review}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Wrapper>
  );
};

export default RecommendationClient;

import React from 'react'
import RecommendationClient from './RecommendationClient';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getRecommendationById } from '@/actions/getRecommendationById';
import { getReviewById } from '@/actions/getReviewById';

interface IParams {
    recommendationId: string;
  }

const page = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  const recommendations = await getRecommendationById(params.recommendationId)
  const theReview = await getReviewById(params.recommendationId)
  const review = theReview?.reverse()
  
  return <RecommendationClient recommendation={recommendations} review={review} currentUser={currentUser}/>
}

export default page
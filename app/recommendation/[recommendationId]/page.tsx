import React from 'react'
import RecommendationClient from './RecommendationClient';
import { getRecommendations } from '@/actions/getRecommendations';
import { getReviews } from '@/actions/getReviews';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getRecommendationById } from '@/actions/getRecommendationById';
import { getReviewById } from '@/actions/getReviewById';

interface IParams {
    recommendationId?: any;
  }

const page = async ({ params }: { params: IParams }) => {
  const recommendations = await getRecommendationById(params.recommendationId)
  const theReview = await getReviewById(params.recommendationId)
  const review = theReview?.reverse()
  
  return <RecommendationClient params={params} recommendation={recommendations} review={review}/>
}

export default page
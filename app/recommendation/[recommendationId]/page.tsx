import React from 'react'
import RecommendationClient from './RecommendationClient';
import { getRecommendations } from '@/actions/getRecommendations';
import { getReviews } from '@/actions/getReviews';
import { getCurrentUser } from '@/actions/getCurrentUser';

interface IParams {
    recommendationId?: any;
  }

const page = async ({ params }: { params: IParams }) => {
  const recommendations = await getRecommendations()
  const review = await getReviews()
  
  return <RecommendationClient params={params} recommendations={recommendations} review={review}/>
}

export default page
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { User } from "prisma/prisma-client";
import { StringifiableRecord } from "query-string";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type UserType = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export type GlobalUserType = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  userBooks: BookType[];
  userRecommendations: RecommendationsType[];
};

export type ReviewType = {
    id: string
    userId: string
    recommendationId: string
    review: string
    reviewerName: string
    reviewerImage?: string
    createdAt: Date
    updatedAt: Date
    user: UserType
}

export type RecommendationsType = {
  id: string;
  title: string;
  author: string;
  description: string;
  poster: string
  posterId: string;
  posterImage: string | null;
  likes: number;
  likers: string[];
  genre: string;
  thumbnail: string;
  smallThumbnail: string;
  createdAt: Date
  updatedAt: Date
};

export type RecommendationsClientType = {
  id: string;
  title: string;
  author: string;
  description: string;
  posterId: string;
  posterImage: string | null;
  likes: number;
  likers: string[];
  genre: string;
  thumbnail: string;
  smallThumbnail: string;
  createdAt: Date
  updatedAt: Date
};

export type BookType = {
  id: string;
  title: string;
  author: string;
  description: string;
  posterId: string;
  likers: string[];
  genre: string;
  status: string;
  progress: number;
  totalPages: number;
  currentPage: number;
  pagesRemaining: number;
  thumbnail: string;
  smallThumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  reviews: string[];
};

export type BookClientType = {
  id: string;
  title: string;
  author: string;
  description: string;
  posterId: string;
  genre: string;
  status: string;
  progress: number;
  totalPages: number;
  currentPage: number;
  pagesRemaining: number;
  thumbnail: string
  smallThumbnail: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type AdminStatsType = {
  allUsers: number | null;
  allRecommendations: number | null;
};

export type UserStatsType = {
    allbooks: number | null
    recommendations: number | null
    finished: number | null
    unread: number | null
    reading: number | null
}


export type HomeData = {
  totalRecommendations: number
  recommendation: any[]
}



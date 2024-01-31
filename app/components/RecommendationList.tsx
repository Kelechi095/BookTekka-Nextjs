import { getCurrentUser } from "@/actions/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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

interface RecommendationListProps {
  book: RecommendationType;
  currentUser: any;
}
export type BookImage = {
  thumbnail: string;
  smallThumbnail: string;
};

export type BookType = {
  title: string;
  authors: string[];
  description: string;
  imageLinks: BookImage;
};

export type BookItemType = {
  volumeInfo: BookType;
};

export type BookDataType = {
  items: BookItemType[];
};

const RecommendationList = ({ book, currentUser }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const noUser =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg";

  const handleAddBookToLibrary = async (arg: any) => {
    const info = {
      title: arg.title,
      author: arg.author,
      thumbnail: arg.thumbnail,
      smallThumbnail: arg.smallThumbnail,
      description: arg.description,
      genre: arg.volumeInfo,
      status: "Unread",
    };

    try {
      setIsSubmitting(true);
      await axios.post("/api/book", info);
      toast.success("book added to library");
      setIsSubmitting(false);
      router.push("/library");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const handleLikeBook = async (arg: any) => {
    try {
      await axios.patch(`/api/likebook/${arg}`);
      toast.success("book liked");
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const handleUnlikeBook = async (arg: any) => {
    try {
      await axios.patch(`/api/unlikebook/${arg}`);
      toast.success("book unliked");
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="border-2 rounded shadow-sm my-4 bg-white py-4 px-2"
      key={book.id}
    >
      <div className="flex items-center gap-2 border-b pb-2">
        <Link href={`/library`}>
          <Image
            src={book.user.image ? book.user.image : noUser}
            alt="Poster image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-10 md:w-12 rounded-full"
          />
        </Link>
        <p className="font-semibold text-sm">{book.user.name}</p>
      </div>
      <Link href={`/recommendation/${book.id}`} key={book.id}>
        <div className="py-2 flex items-center justify-between">
          <div className="flex gap-2 items-center h-40 lg:h-48">
            <Image
              src={book.smallThumbnail}
              alt={book.title}
              width="0"
              height="0"
              sizes="100vw"
              className="w-20 md:w-24"
            />
            <div>
              <p className="text-base font-bold text-slate-800">{book.title}</p>
              <p className="text-sm font-medium text-slate-900">
                {book.author}
              </p>
              <p className="text-sm font-medium text-slate-900">{book.genre}</p>
            </div>
          </div>
        </div>
      </Link>
      {/* Buttons */}
      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-sm mx-1 font-medium text-slate-900">
          {book?.reviews?.length}{" "}
          {book?.reviews?.length === 1 ? "review" : " reviews"}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {book?.likers?.includes(currentUser?.id) ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer text-red-500"
              onClick={() => handleUnlikeBook(book.id)}
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer"
              onClick={() => handleLikeBook(book.id)}
            />
          )}
          <p>{book?.likers.length}</p>
          <p>{book?.likers.length !== 1 ? "Likes" : "Like"}</p>
        </div>
        <button
          className="text-xs border py-2 px-3 rounded-full text-slate-600"
          onClick={() => handleAddBookToLibrary(book)}
        >
          {isSubmitting ? "Submitting" : "Add to library"}
        </button>
      </div>
    </div>
  );
};

export default RecommendationList;

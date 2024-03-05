import { getCurrentUser } from "@/actions/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BookType, UserType } from "@/types";
import { noUser } from "../utils/noUser";

interface RecommendationListProps {
  book: BookType;
  currentUser: UserType
}

const RecommendationList = ({ book, currentUser }: RecommendationListProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleAddBookToLibrary = async (arg: BookType) => {
    const info = {
      title: arg.title,
      author: arg.author,
      thumbnail: arg.thumbnail,
      smallThumbnail: arg.smallThumbnail,
      description: arg.description,
      genre: arg.genre,
    };

    try {
      setIsSubmitting(true);
      await axios.post("/api/moveToLibrary", info);
      console.log(info);
      toast.success("book added to library");
      setIsSubmitting(false);
      router.push("/library");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const handleLikeBook = async (arg: any) => {
    try {
      await axios.patch(`/api/likebook/${arg}`);
      toast.success("Book liked");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
    }
  };

  const handleUnlikeBook = async (arg: any) => {
    try {
      await axios.patch(`/api/unlikebook/${arg}`);
      toast.success("Book unliked");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded border shadow-md mt-4 bg-white py-4 px-2"
      key={book.id}
    >
      <div className="flex items-center gap-2 border-b pb-2">
        <Link href={`/globalProfile/${book.user.id}`}>
          <Image
            src={book.user.image ? book.user.image : noUser}
            alt="Poster image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
          />
        </Link>
        <p className="font-semibold text-sm">{book.user.username}</p>
      </div>
      <Link href={`/recommendation/${book.id}`}>
        <div className="py-2 flex items-center justify-between">
          <div className="flex gap-2 items-center h-40 lg:h-48">
            <Image
              src={book.thumbnail}
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
      
      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-sm mx-1 font-medium text-slate-900">
          {book?.reviews?.length}{" "}
          {book?.reviews?.length === 1 ? "review" : " reviews"}
        </p>
        
          <div className="flex items-center gap-1 text-sm">

            {book?.likers?.includes(currentUser?.id) ? (
              currentUser && <AiFillHeart
                size={18}
                className="cursor-pointer text-red-500 active:text-black"
                onClick={() => handleUnlikeBook(book.id)}
              />
            ) : (
              currentUser && <AiOutlineHeart
                size={18}
                className="cursor-pointer active:text-black"
                onClick={() => handleLikeBook(book.id)}
              />
            )}
            
            <p>{book?.likers.length}</p>
            <p>{book?.likers.length !== 1 ? "Likes" : "Like"}</p>
          </div>
        
        {currentUser && (
          <button
            className="text-xs border py-2 px-3 rounded-full text-slate-600 hover:bg-neutral-100"
            onClick={() => handleAddBookToLibrary(book)}
          >
            {isSubmitting ? "Submitting..." : "Add to library"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecommendationList;

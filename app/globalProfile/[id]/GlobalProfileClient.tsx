"use client";

import Image from "next/image";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import toast from "react-hot-toast";

const GlobalProfileClient = ({ user }: any) => {
  console.log(user);
  const noUser =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg";

    const handleFollowUser = async() => {
      try {
        await axios.post(`/api/follow/${user.id}`)
        toast.success("Added to followers")
      } catch (err) {
        toast.error('Something just happened')
      }
    }

  return (
    <Wrapper>
      <div className="content font-semibold">
        <div className="mx-auto flex flex-col items-center justify-center">
          <Image
            src={user.image ? user.image : noUser}
            alt="user image"
            width="0"
            height="0"
            sizes="100vw"
            className="shadow rounded-full w-48 h-48 md:w-60 md:h-60 object-cover border-none mx-auto"
          />
          <p className="self-center mt-4 text-lg font-bold">{user?.name}</p>
          <p className="self-center mt-4">
            {user?.userBooks.length} books in library
          </p>
          <p className="self-center mt-4">
            {user?.userRecommendations.length}{" "}
            {user?.userRecommendations.length === 1 ? "book" : "books"}{" "}
            recommended
          </p>

          <p className="self-center mt-4 font-semibold underline text-cyan-500">
            Recently added
          </p>
          <div className="flex gap-3 self-center">
            {user?.userBooks?.slice(0, 3).map((book: any) => (
              <div key={book?.id}>
              <Image
                  src={book?.thumbnail}
                  alt="book"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="border rounded w-20 mt-2"
                /> 
              </div>
            ))}
          </div>
          <button onClick={() => handleFollowUser(user.id)}>Follow User</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default GlobalProfileClient;

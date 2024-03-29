"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { capitalizeFirst } from "../utils/capitalizeFirst";
import Wrapper from "../components/Wrapper";
import { SafeUser } from "@/types";

interface NewUserClientProps {
  currentUser: SafeUser | null;
}

const NewUserClient = ({ currentUser }: NewUserClientProps) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSetUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.patch(`/api/newusername`, {
        username: capitalizeFirst(username),
      });
      router.push("/");
      toast.success("Username created");
      setIsLoading(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.response.data);
      setIsLoading(false);
    }
  };

  if ((currentUser && currentUser.username) || !currentUser) redirect("/");

  return (
    <Wrapper>
      <div className="flex items-center justify-center h-screen">
        <div className="md:w-[50%] w-full mx-auto border bg-white mb-24 px-3 rounded shadow-md text-sm py-6">
          <form className="grid w-full" onSubmit={handleSetUsername}>
            <h2 className="font-semibold text-center text-lg mb-2">
              Please create a unique username
            </h2>

            <input
              type="text"
              value={username}
              name="currentPage"
              className="border-2 px-2 py-3 outline-none text-base md:text-lg"
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              className=" mt-4 disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-neutral-800 bg-neutral-800 flex items-center justify-center gap-2 text-white py-4 px-2"
              type="submit"
            >
              {isLoading ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewUserClient;

"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NewUserClient = ({currentUser}: any) => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSetUsername = async () => {
    try {
      await axios.patch(`/api/newusername`, { username });
      router.push("/");
      router.refresh()
      toast.success("Username created");
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err.response.data);
    }
  };


  if(currentUser && currentUser.username || !currentUser) redirect("/")

  return (
    <div>
        <h2>Please create a unique username</h2>
      <input
        type="text"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
        className="border-2 border-black"
      />
      <button onClick={handleSetUsername}>Submit</button>
    </div>
  );
};

export default NewUserClient;

"use client";

import { AiOutlineMenu } from "react-icons/ai";
import ProfileAvatar from "./ProfileAvatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import toast from "react-hot-toast";

interface DropDownProps {
  currentUser: SafeUser | null;
}

const Dropdown = ({ currentUser }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleProfile = () => {
    router.push("/profile");
    toggleClose();
  };

  const handleAdmin = () => {
    router.push("/admin");
    toggleClose();
  };

  const handleLogout = () => {
    signOut();
    toast.success("Logged out");
    toggleClose();
  };

  const handleAddBook = () => {
    router.push("/library/add-book");
    toggleClose();
  };

  return (
    <div className="relative flex">
      <section
        className="flex items-center gap-3
       "
      >
        {currentUser ? (
          <button
            className="text-sm border hidden md:flex rounded-full py-1 px-2 hover:bg-neutral-100"
            onClick={handleAddBook}
          >
            Add book
          </button>
        ) : (
          <button
            className="text-sm border hidden md:flex rounded-full py-1 px-2 hover:bg-neutral-100"
            onClick={() => router.push("/register")}
          >
            Create an account
          </button>
        )}
        <div
          className=" px-2 py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggle}
        >
          <AiOutlineMenu />
          <div className="">
            <ProfileAvatar profilePicture={currentUser?.image} />
          </div>
        </div>
      </section>
      {isOpen && (
        <section className="dropdown">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Profile" handleClick={handleProfile} />
                {currentUser.role === "ADMIN" && (
                  <MenuItem label="Admin" handleClick={handleAdmin} />
                )}
                <MenuItem label="Logout" handleClick={handleLogout} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  handleClick={() => {
                    router.push("/login");
                    toggleClose();
                  }}
                />

                <MenuItem
                  label="Register"
                  handleClick={() => {
                    router.push("/register");
                    toggleClose();
                  }}
                />
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dropdown;

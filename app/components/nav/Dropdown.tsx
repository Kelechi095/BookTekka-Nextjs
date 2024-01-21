"use client";

import { AiOutlineMenu } from "react-icons/ai";
import ProfileAvatar from "./ProfileAvatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

interface DropDownProps {
  currentUser: SafeUser | null;
}

const Dropdown = ({ currentUser }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  console.log(currentUser);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const toggleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleProfile = () => {
    router.push("/profile");
    toggleClose()
  };

  const handleLogout = () => {
    signOut();
    toggleClose()
  };
  
  const handleAddBook = () => {
    router.push("/add-book");
    toggleClose()
  };

  return (
    <div className="relative flex">
      <div className="flex items-center gap-3 bg-rose-500">
        <button
          className="text-sm border rounded-full py-1 px-2 hover:bg-neutral-100"
          onClick={handleAddBook}
        >
          Add book
        </button>
        <div className=" px-2 py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggle}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <ProfileAvatar profilePicture={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Profile" handleClick={handleProfile} />
                <MenuItem label="Logout" handleClick={handleLogout} />
              </>
            ) : (
              <>
                <MenuItem label="Login" handleClick={() => {
                  router.push('/login')
                  toggleClose()
                }} />

                <MenuItem label="Register" handleClick={() => {
                  router.push('/register')
                  toggleClose()
                }} />
                
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

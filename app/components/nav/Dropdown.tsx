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

  const toggleOpen = useCallback(() => {
    setIsOpen(true);
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
    <div className="relative hidden md:flex">
      <div className="flex items-center gap-3">
        <button
          className="text-sm border rounded-full py-1 px-2 hover:bg-neutral-100"
          onClick={handleAddBook}
        >
          Add book
        </button>
        <div className="toggle_dropdown" onClick={toggleOpen}>
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

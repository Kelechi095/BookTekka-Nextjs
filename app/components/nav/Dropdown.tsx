'use client'

import { AiOutlineMenu } from "react-icons/ai";
import ProfileAvatar from "./ProfileAvatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleProfile = () => {
    router.push("/profile")
    setIsOpen((prev) => !prev)
  }

  const handleLogout = () => {

  }

  const handleAddBook = () => {
    router.push("/add-book")
  }
  
  const user = {
    profilePicture: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
  }
    


  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button className="text-sm border rounded-full p-1 px-2 hover:bg-neutral-100" onClick={handleAddBook}>Add book</button>
        <div className="toggle_dropdown" onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <ProfileAvatar profilePicture={user?.profilePicture}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Profile" handleClick={handleProfile}/>
              <MenuItem
                label="Logout"
                handleClick={handleLogout}
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
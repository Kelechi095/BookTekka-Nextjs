import React from "react";

interface FooterListProps {
  children: React.ReactNode;
}

const FooterList = ({ children }: FooterListProps) => {
  return (
    <div className="w-full mb-6 flex flex-col gap-2">
      {children}
    </div>
  );
};

export default FooterList;

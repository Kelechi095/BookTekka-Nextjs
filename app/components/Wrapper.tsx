"use client"

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
    return <div className="px-4 xl:px-20 md:px-10 py-2 md:py-8;">{children}</div>;
  };
  
  export default Wrapper;
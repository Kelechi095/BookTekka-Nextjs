"use client";

import Image from "next/image";
import Wrapper from "../../components/Wrapper";
import { noUser } from "@/app/utils/noUser";
import { GlobalUserType} from "@/types";

interface GlobalProfileClientProps {
  user: GlobalUserType;
}

const GlobalProfileClient = ({ user }: GlobalProfileClientProps) => {
  return (
    <Wrapper>
      <div className="w-full md:w-[60%] mx-auto shadow-sm">
        <section className="w-full bg-slate-300 h-[200px] relative px-6">
          <Image
            src={user?.image ? user?.image : noUser}
            alt="user image"
            width="0"
            height="0"
            sizes="100vw"
            className="shadow rounded-full w-32 h-32 md:w-36 md:h-36 object-cover border-4 border-white absolute -bottom-14 md:-bottom-16"
          />
          <div className="absolute -bottom-9 right-10"></div>
        </section>
        <section className="mt-16 p-4">
          <p className="self-center font-bold text-lg">{user?.name}</p>
          <p className="self-center text-neutral-400 text-sm">
            @{user?.username}
          </p>
          <p className="self-center text-sm">{user?.bio}</p>
        </section>

        <section className="w-full py-2 grid grid-cols-2">
          <div className="shadow-sm border border-neutral-100 flex flex-col justify-center items-center gap-2 py-2">
            <p className="text-center text-neutral-500 text-sm md:text-base">
              Books in library
            </p>
            <p className="font-semibold text-neutral-600">
              {user?.userBooks.length}
            </p>
          </div>
          <div className="border border-neutral-100 shadow-sm flex flex-col justify-center items-center gap-2 py-2">
            <p className="text-center text-neutral-500 text-sm md:text-base">
              Recommendations
            </p>
            <p className="font-semibold text-lg text-neutral-600">
              {user?.userRecommendations.length}
            </p>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default GlobalProfileClient;

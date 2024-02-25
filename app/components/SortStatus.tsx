import { useEffect, useState } from "react";
import { statusOptions, sortButtons } from "../utils/buttons";

import { BiSolidChevronDown, BiSolidChevronRight } from "react-icons/bi";
import { useSearchParams } from "next/navigation";

interface SortStatusProps {
  statusTerm: string;
  sortTerm: string;
  isSort: boolean;
  isStatus: boolean;
  toggleSortBar: () => void;
  toggleStatusBar: () => void;
  handleStatus: (arg: string) => void;
  handleSort: (arg: string) => void;
  setStatusTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SortStatus({
  isSort,
  isStatus,
  statusTerm,
  setStatusTerm,
  sortTerm,
  setSortTerm,
  handleSort,
  handleStatus,
  toggleSortBar,
  toggleStatusBar,
}: SortStatusProps) {
  const params = useSearchParams();
  const [sortTitle, setSortTitle] = useState(
    params.get("sort") ? params.get("sort") : "Newest"
  );
  const [statusTitle, setStatusTitle] = useState(
    params.get("status") ? params.get("status") : "All"
  );

  useEffect(() => {
    setSortTitle(params.get("sort") ? params.get("sort") : "Newest");
    setStatusTitle(params.get("status") ? params.get("status") : "All");
  }, [params]);

  return (
    <div className="sort_filter relative flex justify-between my-6 lg:mb-4">
      <div
        className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
        onClick={toggleSortBar}
      >
        <p className="text-sm">{sortTitle}</p>
        {isSort ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isSort && (
        <ul className="absolute top-12 bg-white w-36 md:w-44 px-2 py-1 rounded shadow-sm border z-10 text-sm">
          {sortButtons.map((button, index) => (
            <li
              key={index}
              className={
                sortTerm === button
                  ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                  : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
              }
              onClick={() => {
                setSortTerm(button);
                toggleSortBar();
                handleSort(button);
              }}
            >
              {button}
            </li>
          ))}
        </ul>
      )}
      <div
        className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
        onClick={toggleStatusBar}
      >
        <p className="text-sm">{statusTitle}</p>
        {isStatus ? <BiSolidChevronDown /> : <BiSolidChevronRight size={16} />}
      </div>
      {isStatus && (
        <ul className="absolute top-12 right-0 bg-white w-36 md:w-44 px-2 py-1 rounded shadow-sm border z-10 text-sm">
          {statusOptions.map((button) => (
            <li
              key={button}
              className={
                statusTerm === button
                  ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                  : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
              }
              onClick={() => {
                setStatusTerm(button);
                toggleStatusBar();
                handleStatus(button);
              }}
            >
              {button}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

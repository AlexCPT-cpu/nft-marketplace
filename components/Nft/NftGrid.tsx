import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import NftCard from "./NftCard";

const NftGrid = () => {
  return (
    <div className="mx-auto mt-32 text-center justify-center items-center">
      <div className="flex justify-between px-10 mb-6">
        <div className="flex flex-row items-center px-4 py-1 text-black dark:text-gray-400">
          <div className="px-4 py-2 items-center border dark:border-[#2c3641] transition-all hover:text-white rounded-md flex flex-row cursor-pointer hover:bg-yellow-600">
            Filter <ChevronDownIcon className="w-4 ml-2" />
          </div>
        </div>

        <div className="flex flex-row items-center px-4 py-1">
          <div className="font-semibold bg-neutral-200 dark:border-[#2c3641] dark:bg-neutral-900 border-l border-t border-b border-r rounded-tl-md rounded-bl-md px-4 py-2">
            Sort By
          </div>
          <div className="border-r flex flex-row border-t dark:border-[#2c3641] border-b rounded-tr-md rounded-br-md px-4 py-2">
            Date Listed:&nbsp; &nbsp; Newest{" "}
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
        </div>
      </div>
      <hr className="mb-8 mx-14" />
      <div className="grid grid-cols-4 mx-auto items-center justify-center pl-7 gap-8">
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
      </div>
    </div>
  );
};

export default NftGrid;

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, useCallback } from "react";
import NftCard from "../Cards/NftCard";
import fetch from "@/helpers/fetch";
import type { NFT } from "@prisma/client";

const NftGrid = () => {
  const [data, setData] = useState<NFT[]>([]);

  const get = useCallback(async () => {
    const response = await fetch("GET", "/api/getNfts");
    return response?.data;
  }, []);

  useEffect(() => {
    get().then((data) => setData(data));
  }, [get]);

  return (
    <div className="mx-auto mt-32 text-center justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between px-3 lg:px-10 mb-6">
        <div className="flex flex-row items-center px-4 py-1 text-black dark:text-gray-400">
          <div className="px-4 py-2 items-center border dark:border-[#2c3641] transition-all hover:text-white rounded-md flex flex-row cursor-pointer hover:bg-yellow-600">
            Filter <ChevronDownIcon className="w-4 ml-2" />
          </div>
        </div>

        <div className="flex flex-row items-center px-4 py-1">
          <div className="font-semibold bg-neutral-200 dark:border-[#2c3641] dark:bg-[#041824] border-l border-t border-b border-r rounded-tl-md rounded-bl-md px-4 py-2">
            Sort By
          </div>
          <div className="border-r flex flex-row border-t dark:border-[#2c3641] border-b rounded-tr-md rounded-br-md px-4 py-2">
            Date Listed:&nbsp; &nbsp; Newest{" "}
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
        </div>
      </div>
      <hr className="mb-8 mx-7 md:mx-14" />
      <div className="grid grid-cols-1 md:grid-cols-2 md:pl-12 lg:grid-cols-4 mx-auto items-center justify-center pl-10 gap-8">
        {data?.map((nft) => (
          <NftCard
            likes={nft.likes!}
            price={nft.currentValue!}
            nftAddress={nft.collectionAddress!}
            nftId={nft.nftId!}
            key={nft.id}
            data={nft}
          />
        ))}
      </div>
    </div>
  );
};

export default NftGrid;

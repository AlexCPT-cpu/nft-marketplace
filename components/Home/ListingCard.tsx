import { NftProps } from "@/types/types";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { factory } from "@/config/config";
import fetch from "@/helpers/fetch";

const ListingCard: React.FC<{ contract: string; Data: any }> = ({
  contract,
  Data,
}) => {
  const NftCard = ({
    image,
    name,
    timer,
    likes,
    price,
    nftAddress,
    nftId,
  }: NftProps) => {
    const [metaData, setMetaData] = useState<any>();

    const getMeta = useCallback(async () => {
      const { data } = await fetch("POST", "/api/metadata", {
        address: nftAddress,
        tokenId: nftId,
      });
      return data;
    }, [nftId, nftAddress]);

    useEffect(() => {
      if (nftAddress && nftId) {
        getMeta().then((meta) => setMetaData(meta));
      }
    }, [getMeta, nftAddress, nftId]);

    return (
      <div className="border dark:bg-[#041824] border-yellow-400 dark:border-yellow-400 p-4 rounded-md max-w-[300px] hover:shadow-xl">
        <div className="relative">
          {metaData?.media[0].thumbnail && (
            <Image
              className="object-cover w-full rounded-md mb-5"
              src={metaData?.media[0].thumbnail!}
              width={200}
              height={200}
              alt="card image"
            />
          )}
          <div className="absolute top-2 right-3">
            <div className="px-2 flex flex-row space-x-2 bg-white rounded-full text-black cursor-pointer">
              <HeartIcon className="w-5 mr-2 fill-red-500" />
              {likes}
            </div>
          </div>
          <div className="absolute bottom-2 left-3">
            {/* <div className="px-2 flex flex-row space-x-2 bg-white rounded-full text-black cursor-pointer">
              <ClockIcon className="w-5 stroke-sky-300 mr-2" />
              {timer}
            </div> */}
          </div>
        </div>

        <hr className="border-yellow-400 dark:border-yellow-400 mb-4" />

        <div className="flex flex-col text-left space-y-2">
          <div className="flex flex-row items-center">
            {metaData?.contract?.name}{" "}
            <span>
              {" "}
              <CheckCircleIcon className="w-5 fill-green-600 ml-2" />{" "}
            </span>
          </div>
          <div className="font-semibold text-lg">
            {metaData?.rawMetadata?.title}
          </div>
          <div className="flex flex-row">
            <CurrencyDollarIcon className="w-6 mr-2" />{" "}
            <span className="text-slate-400 dark:text-neutral-600">
              {price} BTC ≈$26.69
            </span>
          </div>
          <Link href={`/collection/${nftAddress ?? factory}/nft/${nftId ?? 1}`}>
            <div className="flex flex-row border rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]">
              <BanknotesIcon className="w-6" />{" "}
              <span className="dark:text-neutral-500 whitespace-nowrap text-black text-lg ml-3">
                Place Bid
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 md:pl-7 grid-cols-1 lg:grid-cols-4 mx-auto items-center justify-center pl-3 lg:pl-1 gap-8 my-5">
      {Data?.data?.map((data: any, index: number) => {
        return data[2] !== "0x0000000000000000000000000000000000000000" ? (
          <NftCard
            nftAddress={contract}
            nftId={parseInt(data[0]?._hex)}
            key={index}
          />
        ) : (
          null
        );
      })}
    </div>
  );
};

export default ListingCard;

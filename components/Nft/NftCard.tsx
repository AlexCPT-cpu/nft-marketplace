import { NftProps } from "@/types/types";
import React from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import {} from "@heroicons/react/24/outline";
import Link from "next/link";
import History from "./History";

const NftCard = ({ image, name, timer, likes, price }: NftProps) => {
  return (
    <div className="border dark:bg-[#041824] border-black dark:border-[#092940] p-4 rounded-md hover:shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between w-full">
        <div className="relative">
          <Image
            className="object-cover w-full h-[300px] lg:w-[400px] lg:h-[400px] rounded-md mb-5"
            src={image!}
            width={200}
            height={200}
            alt="card image"
          />
        </div>

        <div className="flex flex-col text-left space-y-2 dark:text-gray-500">
          <div className="font-bold text-2xl">{name}</div>
          <div className="flex flex-row items-center">
            <Link className="flex flex-row items-center" href="/">
              Super_color{" "}
              <span>
                {" "}
                <CheckCircleIcon className="w-5 fill-green-600 ml-1" />{" "}
              </span>
            </Link>
          </div>

          <div className="flex flex-col my-3 py-2">
            <div className="text-xl font-">Current Price</div>
            <div className="flex flex-row">
              <CurrencyDollarIcon className="w-6 mr-2 dark:text-white" />{" "}
              <span className="text-green-600 font-semibold text-2xl">
                {price} BTC ≈$26.69
              </span>
            </div>
          </div>

          <div className="text-xl pb-3">
            Auction ending in
            <div className="text-3xl text-red-500">{"7:25:3"}</div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-row border rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]">
              <BanknotesIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
              <span className="dark:text-neutral-500 text-black text-lg ml-3">
                Place Bid
              </span>
            </div>

            <div className="flex flex-row border group rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]">
              <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
              <span className="dark:text-neutral-500 text-black text-lg ml-3">
                Place Bid
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mr-0 lg:mr-60 lg:justify-center justify-start my-5 lg:mt-0 items-center">
          <div className="flex items-center justify-start lg:justify-center mr-auto flex-row">
            <div className="ring-1 ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="w-10 cursor-pointer rounded-full"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Creator</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link href="/">{name}</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start mr-auto lg:justify-center flex-row">
            <div className="ring-1 ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="w-10 cursor-pointer rounded-full"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Owner</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link href="/">@{name}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <History />
    </div>
  );
};

NftCard.defaultProps = {
  image: "/poke.jpg",
  name: "Beeple",
  timer: "21:50:23",
  likes: 13,
  price: 0.083,
};

export default NftCard;

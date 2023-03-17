import { NftProps } from "@/types/types";
import React from "react";
import Image from "next/image";
import { CheckCircleIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/solid'
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const UserNftCard = ({ image, name, timer, likes, price }: NftProps) => {
    return (
      <div className="border dark:bg-[#041824] border-yellow-400 dark:border-yellow-400 p-4 rounded-md max-w-[300px] hover:shadow-xl">
        <div className="relative">
          <Image className="object-cover w-full rounded-md mb-5" src={image!} width={200} height={200} alt="card image" />
          <div className="absolute top-2 right-3">
              <div className="px-2 flex flex-row space-x-2 bg-white rounded-full text-black cursor-pointer">
              <HeartIcon className="w-5 mr-2 fill-red-500" />
              {likes}
              </div>
          </div>
          <div className="absolute bottom-2 left-3">
          <div className="px-2 flex flex-row space-x-2 bg-white rounded-full text-black cursor-pointer">
              <ClockIcon className="w-5 stroke-sky-300 mr-2" />
              {timer}
              </div>
          </div>
        </div>
  
        <hr className="border-yellow-400 dark:border-yellow-400 mb-4" />
  
        <div className="flex flex-col text-left space-y-2">
            <Link href='/'>
          <div className="flex flex-row items-center hover:text-gray-400">
              Super_color <span> <CheckCircleIcon className="w-5 fill-green-600 ml-2" /> </span>
          </div>
          </Link>
          <Link href='/'>
          <div className="font-semibold text-xl hover:text-gray-400">
              {name}
          </div>
          </Link>
          </div>
          <div className="flex flex-row">
              <CurrencyDollarIcon className="w-6 mr-2" /> <span className="text-slate-400 dark:text-neutral-600">{price} BTC ≈$26.69</span>
          </div>
        </div>
    );
  };
  
  UserNftCard.defaultProps = {
    image: "/poke.jpg",
    name: "Beeple",
    timer: "21:50:23",
    likes: 13,
    price: 0.083,
  };

export default UserNftCard
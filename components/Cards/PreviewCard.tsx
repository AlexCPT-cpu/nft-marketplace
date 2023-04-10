import { NftProps } from "@/types/types";
import React from "react";
import Image from "next/image";
import { CheckCircleIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/solid'
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Cart from "../Svg/Cart";

const PreviewCard = ({ image, name, price }: NftProps) => {
  return (
    <div className="border dark:bg-[#041824] border-yellow-500 dark:border-yellow-500 p-4 rounded-md max-w-[300px] hover:shadow-xl">
      <div className="relative">
        <Image className="object-cover w-full h-[250px] rounded-md mb-5" src={image!} width={200} height={300} alt="card image" />
      </div>

      <hr className="border-yellow-400 dark:border-yellow-400 mb-4" />

      <div className="flex flex-col text-left space-y-2">
        <div className="flex dark:text-gray-400 flex-row items-center text-xl font-semibold">
            {name} <span></span>
        </div>
        <div className="flex flex-row">
            <CurrencyDollarIcon className="w-6 mr-2" /> <span className="text-slate-400 dark:text-neutral-600">{price} BTC ≈$26.69</span>
        </div>
        <div className="flex group flex-row border rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]">
            <Cart /> <span className="dark:text-neutral-300 text-black text-lg ml-3">Buy Now</span>
        </div>
      </div>
    </div>
  );
};

PreviewCard.defaultProps = {
  image: "/poke.jpg",
  name: "Beeple",
  timer: "21:50:23",
  likes: 13,
  price: 0.083,
};

export default PreviewCard;

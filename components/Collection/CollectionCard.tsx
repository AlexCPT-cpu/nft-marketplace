import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CollectionCardProps } from "@/types/types";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import getCollectionName from "@/helpers/getCollectionName";
import { MarketContext } from "@/context/marketplaceContext";
import truncateEthAddress from "truncate-eth-address";
import fetch from "@/helpers/fetch";

const CollectionCard: React.FC<CollectionCardProps> = ({
  address,
  image,
  name,
  desc,
  username,
  items,
  owners,
  floor,
  volume,
}) => {
  const { collAddress } = MarketContext();

  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [Owners, setOwners] = useState(0);

  useEffect(() => {
    const getNft = async () => {
      const { data }: any = await getCollectionName(address);
      setTitle(data?.collectionName);
      setOwner(data?.creator);

      const response = await fetch("POST", "/api/getOwners", {
        address,
      });
      setOwners(response?.data?.owners?.length);
    };

    getNft();
  }, [address]);

  return (
    <div className="border-[1px] flex items-center flex-col lg:flex-row lg:justify-between border-gray-200 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
      <div className="flex items-center space-y-3 lg:space-y-4 flex-col w-full text-center min-w-[300px] lg:flex-row lg:space-x-10">
        <div className="ring-1 ring-black dark:ring-white rounded-full">
          <Image
            className="w-28 cursor-pointer rounded-full"
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
            alt="avatar"
            width={50}
            height={50}
          />
        </div>

        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <div className="text-black text-center lg:text-left dark:text-neutral-500 text-3xl font-bold">
            {title}
          </div>
          <div className="text-neutral-500 text-opacity-1">
            <Link
              href="/"
              className="dark:hover:text-gray-200 text-center lg:text-left hover:text-neutral-800 cursor-pointer"
            >
              Created by @{truncateEthAddress(owner)}
            </Link>
          </div>

          <div className="dark:text-gray-500 text-center lg:text-left">
            {desc}
          </div>

          <div className="flex flex-row items-center justify-center my-2 space-x-2">
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <AiOutlineInstagram size={22} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <FaTwitter size={20} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <BsFacebook size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-l border-l-sky-500/20 ml-4 pl-8 mt-5 lg:mt-0 mb-5 pr-12 lg:mb-0 flex-col space-y-4 whitespace-nowrap">
        <div className="flex flex-row dark:text-neutral-500 space-x-24">
          <div>
            {(items / 1000).toFixed(1)}K<p className="font-bold">Items</p>
          </div>
          <div className="dark:text-neutral-500">
            {floor.toFixed(2)} BNB
            <p className="font-bold">Floor Price</p>
          </div>
        </div>

        <div className="flex flex-row dark:text-neutral-500 space-x-24">
          <div>
            {Owners > 1000 ? `${Owners / 1000}K` : Owners}
            <p className="font-bold">Owners</p>
          </div>
          <div className="dark:text-neutral-500">
            {volume}
            <p className="font-bold">Volume Traded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionCard.defaultProps = {
  image: "",
  name: "Super_color",
  username: "Created by @Super_color",
  desc: "Description",
  items: 1100,
  owners: 372,
  floor: 0.5,
  volume: 32.2122,
};

export default CollectionCard;

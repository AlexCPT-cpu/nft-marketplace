import { CreatorProps } from "@/types/types";
import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import truncateEthAddress from "truncate-eth-address";
import useCopyToClipboard from "@/hooks/CopyToClipBoard";
import toast from "react-hot-toast";
import Image from "next/image";

const CreatorCard = ({
  image,
  name,
  address,
  background,
  followers,
  items,
  socials,
}: CreatorProps) => {
  const [copyToBoard, setCopyToBoard] = useState<boolean>(false);
  const [value, copy] = useCopyToClipboard();

  const setCopyAddress = (addr: string) => {
    const notification = toast.success("Copied ... 😉");
    copy(addr);
    setCopyToBoard(true);
    setTimeout(() => {
      setCopyToBoard(false);
    }, 2000);
  };

  return (
    <div className="border border-yellow-400 dark:bg-[#041824] dark:border-yellow-400 p-4 rounded-md max-w-[300px] hover:shadow-xl">
      <div className="flex flex-col space-y-5">
        <div className="relative">
          <Image
            className="object-cover w-full rounded-md mb-5 h-20"
            src={background!}
            width={200}
            height={200}
            alt="card image"
          />
          <Link href="/">
            <Image
              className="object-cover absolute ring-1 bg-slate-800/30 ring-gray-300 w-16 top-12 cursor-pointer left-24 rounded-full mb-5"
              src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
              width={200}
              height={200}
              alt="card image"
            />
          </Link>
          <div className="absolute top-24 cursor-pointer right-28">
            <CheckCircleIcon className="fill-[#629d24] bg-clip-content text-clip rounded-full w-6" />
          </div>
        </div>

        <div className="text-black dark:text-neutral-400 text-lg font-semibold text-center">
          <Link href="/user/1">Stephine Smith</Link>
          <div className="text-black dark:text-gray-600 text-base text-center flex flex-row justify-center mt-1">
            {truncateEthAddress(
              `${address ?? "0xb16c1342E617A5B6E4b631EB114483FDB289c0A4"}`
            )}
            {copyToBoard ? (
              <ClipboardDocumentCheckIcon className="w-4 cursor-pointer ml-3" />
            ) : (
              <DocumentDuplicateIcon
                className="w-4 cursor-pointer ml-3"
                onClick={() =>
                  setCopyAddress(
                    address ?? "0xb16c1342E617A5B6E4b631EB114483FDB289c0A4"
                  )
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-3 mx-auto text-center justify-center">
          <div className="p-2 ring-1 w-fit rounded-full hover:text-gray-500 ring-yellow-400 dark:ring-yellow-400 cursor-pointer">
            <Link className="" href="/">
              <AiOutlineInstagram className="" size={20} />
            </Link>
          </div>

          <div className="p-2 ring-1 w-fit rounded-full hover:text-gray-500 ring-yellow-400 dark:ring-yellow-400 cursor-pointer">
            <Link className="" href="/">
              <FaTwitter className="" size={20} />
            </Link>
          </div>

          <div className="p-2 ring-1 w-fit rounded-full hover:text-gray-500 ring-yellow-400 dark:ring-yellow-400 cursor-pointer">
            <Link className="" href="/">
              <BsFacebook className="" size={20} />
            </Link>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-black dark:text-neutral-400 font-bold text-xl">
              {followers}
            </div>
            <div className="text-black dark:text-gray-600">Followers</div>
          </div>

          <div className="flex flex-col">
            <div className="text-black dark:text-neutral-400 font-bold text-xl">
              {items}
            </div>
            <div className="text-black dark:text-gray-600">Items</div>
          </div>
        </div>

        <Link href="/user/1">
          <div className="group text-center space-x-3  pl-20 flex justify-center items-center border rounded-full border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition from-[#feb019] to-[#ef7e56]">
            <div className="">
              <svg
                width="32"
                height="32"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 30C25.0751 30 30 25.0751 30 19C30 12.9249 25.0751 8 19 8C12.9249 8 8 12.9249 8 19C8 25.0751 12.9249 30 19 30Z"
                  className="fill-[#feb019]"
                ></path>
                <path
                  opacity="0.8"
                  d="M36 19C36 28.374 28.374 36 19 36C10.697 36 3.701 29.989 2.276 22H4.301C5.691 28.847 11.743 34 19 34C27.284 34 34 27.284 34 19C34 10.716 27.284 4 19 4C10.716 4 4 10.716 4 19C4 19.338 4.028 19.668 4.05 20H2V19C2 9.626 9.626 2 19 2C28.374 2 36 9.626 36 19ZM18 12V18H12V20H18V26H20V20H26V18H20V12H18Z"
                  className="fill-black dark:fill-gray-600 group-hover:fill-black transition dark:group-hover:fill-white"
                ></path>
              </svg>
            </div>
            <div className="text-black text-sm w-full text-center dark:text-neutral-400 group-hover:text-white flex flex-row">
              FOLLOW
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

CreatorCard.defaultProps = {
  image: "https://api.dicebear.com/5.x/avataaars/svg?seed=Gracie",
  name: "Kevin Chris",
  address: "0xice",
  background: "/bg1.jpg",
  followers: 443,
  items: 35,
  socials: [
    "https://instagram.com/",
    "https://twitter.com/",
    "https://facebok.com/",
  ],
};

export default CreatorCard;

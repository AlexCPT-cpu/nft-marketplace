import Image from "next/image";
import React from "react";
import { UserCardProps } from "@/types/types";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import useCopyToClipboard from "@/hooks/CopyToClipBoard";
import { toast } from "react-hot-toast";

const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  desc,
  username,
  referrer,
  facebook,
  instagram,
  followers,
  follows,
  twitter,
}) => {
  const [value, copy] = useCopyToClipboard();

  const setShare = (url: string) => {
    const notification = toast.success("Copied Url ... 😉");
    copy(url);
  };

  return (
    <div className="border-[1px] flex items-center flex-col lg:flex-row lg:justify-between border-gray-200 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
      <div className="flex items-center space-y-3 lg:space-y-4 flex-col w-full text-center justify-center min-w-[300px] lg:flex-row lg:space-x-10">
        <div className="ring-1 ring-black dark:ring-white  rounded-full">
          <Image
            className="w-28 cursor-pointer rounded-full"
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
            alt="avatar"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col space-y-4 text-left">
          <div className="text-black dark:text-neutral-500 text-left text-3xl font-bold">
            {name}
          </div>
          <div className="text-neutral-500 text-opacity-1">
            <Link
              href="/"
              className="dark:hover:text-gray-200 text-left hover:text-neutral-800 cursor-pointer"
            >
              @{username}
            </Link>
          </div>

          <div className="dark:text-gray-500 text-left">{desc}</div>

          <div className="flex flex-row items-center space-x-2">
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link
                target="_blank"
                href={`https://www.instagram.com/${instagram}`}
              >
                <AiOutlineInstagram size={22} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link target="_blank" href={`https://www.twitter.com/${twitter}`}>
                <FaTwitter size={20} />
              </Link>
            </div>
            {/* <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link target='_blank' href={`https://www.facebook.com/${facebook}`}>
                <BsFacebook size={20} />
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex mt-5 lg:mt-0 mb-5 lg:mb-0 flex-col space-y-4">
        <div className="flex flex-row dark:text-neutral-400 space-x-7 lg:space-x-24 items-center">
          <div className="whitespace-nowrap">
            {follows} <span className="font-bold">Follows</span>
          </div>
          <div className="whitespace-nowrap">
            {followers} <span className="font-bold">Followers</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setShare(document.location.href)}
            className="border btn btn-outline text-yellow-400 hover:text-white transition  border-yellow-400 hover:bg-[#feb019] w-60 h-10 rounded-3xl"
          >
            Share
          </button>
        </div>
        <div className="flex row items-center justify-between">
          <Image
            className="  ring-1 ring-slate-900 w-10 h-10 cursor-pointer  rounded-full "
            src="https://api.dicebear.com/5.x/avataaars/svg?seed=FeliEnvisionArtNft"
            alt="avatar"
            width={50}
            height={50}
          />
          <div className="dark:text-gray-400">
            Invited by{" "}
            <Link
              href="/"
              className="dark:hover:text-gray-200 hover:text-gray-500 cursor-pointer"
            >
              @{referrer}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  image: "",
  name: "Nellie Maxwell",
  username: "NellieMaxwell",
  desc: "An artist, a son, brother, writer, poet, a street photographer, a student, a teacher, and much more to be.",
  referrer: "EnvisionArtNft",
};

export default UserCard;

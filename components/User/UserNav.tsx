import ArrowDownCircle from "@/components/Svg/ArrowDownCircle";
import ArrowUpCircle from "@/components/Svg/ArrowUpCircle";
import Brush from "@/components/Svg/Brush";
import Cart from "@/components/Svg/Cart";
import File from "@/components/Svg/File";
import { useState } from "react";
import UserNftGrid from "../Grid/UserNftGrid";

const UserNav: React.FC<{ Nfts: any[] }> = ({ Nfts }) => {
  const [active, setActive] = useState({
    created: true,
    collected: false,
    collections: false,
    offersMade: false,
    offersReceived: false,
  });

  const navigate = (option: number) => {
    switch (option) {
      case 0:
        setActive({
          created: true,
          collected: false,
          collections: false,
          offersMade: false,
          offersReceived: false,
        });
        break;
      case 1:
        setActive({
          created: false,
          collected: true,
          collections: false,
          offersMade: false,
          offersReceived: false,
        });
        break;
      case 2:
        setActive({
          created: false,
          collected: false,
          collections: true,
          offersMade: false,
          offersReceived: false,
        });
        break;
      case 3:
        setActive({
          created: false,
          collected: false,
          collections: false,
          offersMade: false,
          offersReceived: true,
        });
        break;
      case 4:
        setActive({
          created: false,
          collected: false,
          collections: false,
          offersMade: true,
          offersReceived: false,
        });
        break;
      default:
        setActive({
          created: true,
          collected: false,
          collections: false,
          offersMade: false,
          offersReceived: false,
        });
    }
  };

  return (
    <>
      <div className="border whitespace-nowrap overflow-y-auto scrollbar-hide relative overflow-auto flex-col lg:flex-row text-left lg:space-x-16 dark:text-gray-500 font-semibold justify-center text-xl flex border-gray-200 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
        <div
          onClick={() => {
            navigate(0);
          }}
          className="flex cursor-pointer transition hover:bg-white/10 py-1 px-5 lg:ml-56 ml-0 xl:ml-0 rounded-lg flex-col"
        >
          <div className="flex flex-row ml-0 lg:ml-5">
            <Brush />
            Created 4
          </div>
          <div
            className={`
          ${
            active.created
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.created
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
        <div
          onClick={() => {
            navigate(1);
          }}
          className="flex cursor-pointer rounded-lg transition hover:bg-white/10 py-1 px-5 flex-col"
        >
          <div className="flex flex-row">
            <Cart />
            Collected
          </div>
          <div
            className={`
          ${
            active.collected
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.collected
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
        <div
          onClick={() => {
            navigate(2);
          }}
          className="flex cursor-pointer rounded-lg transition hover:bg-white/10 py-1 px-5 flex-col"
        >
          <div className="flex flex-row">
            <File />
            Collections 4
          </div>
          <div
            className={`
          ${
            active.collections
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.collections
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
        <div
          onClick={() => {
            navigate(3);
          }}
          className="flex cursor-pointer rounded-lg transition hover:bg-white/10 py-1 px-5 flex-col"
        >
          <div className="flex flex-row">
            <ArrowDownCircle />
            Offers Received
          </div>
          <div
            className={`
          ${
            active.offersReceived
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.offersReceived
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
        <div
          onClick={() => {
            navigate(4);
          }}
          className="flex cursor-pointer hover:bg-white/10 py-1 px-5 rounded-lg transition flex-col"
        >
          <div className="flex flex-row">
            <ArrowUpCircle />
            Offers Made
          </div>
          <div
            className={`
          ${
            active.offersMade
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.offersMade
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
      </div>

      <UserNftGrid userNfts={Nfts} active={active} />
    </>
  );
};

export default UserNav;

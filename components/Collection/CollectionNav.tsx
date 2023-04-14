import Brush from "@/components/Svg/Brush";
import Cart from "@/components/Svg/Cart";
import { useState } from "react";
import CollectionData from "./CollectionData";
import CollectionNftGrid from "./CollectionNftGrid";

const CollectionNav = ({ address }: { address: string }) => {
  const [active, setActive] = useState({
    items: true,
    activity: false,
  });

  const navigate = (option: number) => {
    switch (option) {
      case 0:
        setActive({
          items: true,
          activity: false,
        });
        break;
      case 1:
        setActive({
          items: false,
          activity: true,
        });
        break;
      default:
        setActive({
          items: true,
          activity: false,
        });
    }
  };

  return (
    <div>
      <div className="border mt-8 relative overflow-auto flex-col lg:flex-row text-left lg:space-x-16 dark:text-gray-500 font-semibold justify-center text-xl flex border-gray-200 dark:border-[#092940] p-4 rounded-md w-full">
        <div
          onClick={() => {
            navigate(0);
          }}
          className="flex cursor-pointer transition hover:bg-white/10 py-1 px-5 rounded-lg flex-col"
        >
          <div className="flex flex-row">
            <Brush />
            items 4
          </div>
          <div
            className={`
          ${
            active.items
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.items
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
            activity
          </div>
          <div
            className={`
          ${
            active.activity
              ? "bg-[#feb019] mt-1 hidden lg:block transition bottom-0 absolute border-[#feb019] w-36 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
          <div
            className={`
          ${
            active.activity
              ? "bg-[#feb019] block lg:hidden mt-1 transition border-[#feb019] w-48 h-1"
              : "bg-transparent border-transparent"
          }`}
          ></div>
        </div>
      </div>
      <div className="mt-8 flex mx-auto justify-center items-center">
        {active.items ? (
          <CollectionNftGrid address={address} />
        ) : (
          <CollectionData />
        )}
      </div>
    </div>
  );
};

export default CollectionNav;

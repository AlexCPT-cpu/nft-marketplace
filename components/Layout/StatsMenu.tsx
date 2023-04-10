import { StatsProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

const StatsMenu: React.FC<StatsProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-white border z-50 text-black dark:text-gray-400 border-gray-300 dark:border-gray-800 rounded-md dark:bg-[#041824] text-base w-40 absolute transition top-16 left-[500px] py-3 flex-col flex">
      <Link
        className="p-2 hover:text-[#e39601] text-left dark:hover:bg-gray-800/40 hover:bg-gray-300/40"
        href="/stats/ranking"
      >
        Ranking
      </Link>

      <Link
        className="p-2 hover:text-[#e39601] dark:hover:bg-gray-800/40 text-left hover:bg-gray-300/40"
        href="/stats/activity"
      >
        Activity
      </Link>
    </div>
  );
};

export default StatsMenu;

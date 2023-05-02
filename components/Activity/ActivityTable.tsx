import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import TableLayout from "./TableLayout";
import TableChild from "./TableChild";
import { Activity } from "@prisma/client";
import fetch from "@/helpers/fetch";
import truncateEthAddress from "truncate-eth-address";

const RankingTable = () => {
  const inputElt = useRef(null);
  const [value, setValue] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>();

  const item = {
    name: "Stone Graphy",
    image: "/stone.jpg",
  };

  const item2 = {
    name: "Ink Duck",
    image: "/duck.jpg",
  };

  const item3 = {
    name: "Face Art",
    image: "/face.jpg",
  };
  useEffect(() => {
    const getActive = async () => {
      const res = await fetch("GET", "/api/activity");
      setActivities(res?.data);
    };

    getActive();
  }, []);
  return (
    <div className="px-6 lg:px-16 mt-10">
      <div className="ml-auto flex justify-end">
        <div className="flex flex-row items-center mb-4 py-1">
          <div className="font-semibold bg-neutral-200 dark:border-[#2c3641] dark:bg-neutral-900 border-l border-t border-b border-r rounded-tl-md rounded-bl-md px-4 py-2">
            Sort By
          </div>
          <div className="border-r flex w-[250px] flex-row border-t dark:bg-[#041824] dark:border-[#2c3641] border-b rounded-tr-md rounded-br-md px-4 py-2">
            Last & Days
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
        </div>
      </div>
      <hr />

      <div className="flex flex-col space-y-5 items-center justify-center lg:space-y-0 lg:flex-row lg:justify-between mt-10 mb-8">
        <div className="font-lg text-black dark:text-gray-500">
          Show
          <select className="border text-black border-black mx-2 p-1 rounded-md">
            <option>15</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          entries
        </div>
        <div className="mr-48 lg:mr-32">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="con-input">
              <input
                ref={inputElt}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                value={value}
                type="text"
                className="py-1"
              />
              {value && (
                <XMarkIcon
                  onClick={() => setValue("")}
                  className="w-5 cursor-pointer"
                />
              )}
              <div className="bg"></div>
            </div>
          </form>
        </div>
      </div>

      <div>
        {" "}
        <TableLayout>
          {activities?.map((activity: Activity) => (
            <TableChild
              key={activity.id}
              event={activity.activityType!}
              items={item}
              price={activity.price!}
              from={truncateEthAddress(activity.from!)}
              to={truncateEthAddress(activity.to != '' ? activity.to! : '0x0000000000000000000000000000000000000000')}
              time="21 minutes ago"
            />
          ))}
          {/* <TableChild
            event="Offer Made"
            items={item}
            price={0.012}
            from="Josephene"
            to="Matteuse"
            time="21 minutes ago"
          />
          <TableChild
            event="Sale"
            price={0.070}
            items={item2}
            from="Albert"
            to="Beelzebub"
            time="30 Minutes ago"
          />
          <TableChild
            event="Bid"
            items={item3}
            price={1.00}
            from="Josephene"
            to="Matteuse"
            time="an hour ago"
          />
          <TableChild
            price={0.80}
            from="Josephene"
            to="Matteuse"
            time="3 hours ago"
          /> */}
        </TableLayout>
      </div>

      <div className="my-6 text-black dark:text-gray-500 font-semibold font-lg">
        Showing {1} to {4} of {4} entries
      </div>

      <div className="flex ml-auto flex-end justify-end">
        <div className="divide-x divide-white dark:divide-black">
          <button className="px-4 py-1 bg-neutral-200 rounded-sm cursor-pointer dark:bg-[#041824]">
            Previous
          </button>
          <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">
            1
          </button>
          <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">
            2
          </button>
          <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">
            3
          </button>
          <button className="px-4 py-1 bg-neutral-200 rounded-sm cursor-pointer dark:bg-[#041824]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingTable;

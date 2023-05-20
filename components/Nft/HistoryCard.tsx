import { Activity } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import truncateEthAddress from "truncate-eth-address";

const HistoryCard: React.FC<{ activity: Activity }> = ({ activity }) => {

  return (
    <div className="flex w-full overflow-x-auto items-center border-b border-b-black dark:border-b-white pb-1 justify-between dark:text-[#b5b5b5]">
      <div className="flex flex-row space-x-2 lg:space-x-8 items-center">
        <div>
          <Image
            className="lg:w-10 w-9 ml-1 cursor-pointer rounded-full ring-1 p-1 ring-black dark:ring-white"
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${"0xgray"}`}
            width={50}
            height={50}
            alt="data-image"
          />
        </div>
        <div className="">
          <div className="whitespace-nowrap">
            <>
              {activity.activityType === "Sell" ? (
                " Listed by "
              ) : (
                <>
                  {activity.activityType === "Buy" ? (
                    "Bought by "
                  ) : (
                    <>
                      {activity.activityType === "PlaceBid" ? (
                        "Bid Placed by "
                      ) : (
                        <>
                          {activity.activityType === "AcceptBid"
                            ? "Bid Accepted by"
                            : "Bid Cancelled by"}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>

            <Link
              href="/"
              target="_blank"
              className="font-bold hover:underline text-black dark:text-gray-300"
            >
              {truncateEthAddress(activity?.fromAddress!)}
            </Link>
          </div>
          {/* <div className="text-neutral-600 text-sm">
            26 Feb 2022 02:47:19 PM
          </div> */}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-lg lg:text-xl font-semibold whitespace-nowrap">
          {activity.price} ETH
        </div>
        <div className="whitespace-nowrap text-sm lg:text-base">3.12 USD</div>
      </div>
    </div>
  );
};

export default HistoryCard;

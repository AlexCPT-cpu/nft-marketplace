import React from "react";
import NftCard from "../Cards/NftCard";

const TrendingAuctions = () => {
  return (
    <div className="lg:px-16 px-8 mt-7 mb-10 text-black dark:text-gray-400">

      <div className="flex flex-row text-xl items-center text-center">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          className="me-2 mr-3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28 9.99999C25.1 9.99999 22.1 8.59999 20 7.29999V15.3L21 13.8C22.9 16.6 26 21.6 26 24.3C26 26.7 24.8 28.3 22.3 29.4C21.7 29.7 20.9 29.9 20 29.9V33.2C23.8 31.3 32 26.3 32 18.9V9.49999C30.8 9.79999 29.5 9.99999 28 9.99999Z"
            fill="#feb019"
          ></path>
          <path
            opacity="0.8"
            d="M19 32C17.4 32 16 31.7 14.9 31.2C11.6 29.7 10 27.4 10 24.2C10 19.7 14 14.5 14.2 14.3L15.1 13.2L17 16.1L21 10.2L21.8 11.3C22.1 11.6 28 19.7 28 24.2C28 27.4 26.4 29.7 23.1 31.2C22 31.7 20.5 32 19 32ZM15 16.8C13.9 18.5 12 21.6 12 24.3C12 26.7 13.1 28.3 15.7 29.5C16.5 29.9 17.7 30.1 19 30.1C20.3 30.1 21.5 29.9 22.4 29.5C24.9 28.4 26.1 26.8 26.1 24.4C26.1 21.7 23 16.6 21.1 13.9L17.1 19.9L15 16.8ZM34.5 4.20001C34.5 4.20001 31.7 6.00001 28 6.00001C24.4 6.00001 19.7 2.30001 19.6 2.20001L19 1.70001L18.4 2.20001C18.4 2.20001 13.6 6.00001 10 6.00001C8.5 6.00001 7.1 5.70001 6 5.30001V7.40001C7.1 7.70001 8.5 8.00001 10 8.00001C13.5 8.00001 17.5 5.40001 19 4.20001C20.5 5.40001 24.5 8.00001 28 8.00001C30.5 8.00001 32.7 7.30001 34 6.70001V19C34 29.2 21.3 35 19 35.9C16.7 35 4 29.2 4 19V4.40001C3.7 4.30001 3.5 4.20001 3.5 4.20001L2 3.10001V19C2 31.5 18 37.7 18.6 37.9L19 38L19.3 37.9C20 37.7 36 31.5 36 19V3.10001L34.5 4.20001Z"
            fill="gray"
            className="fill-black dark:fill-gray-500"
          ></path>
        </svg>
        

        HOT BIDS
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-2xl lg:text-3xl font-semibold">
        Trending Auctions
        </div>
        <div className="text-lg lg:text-xl relative transition border-2 border-transparent rounded-sm hover:border-[#feb019]">
        VIEW ALL
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:pl-7 grid-cols-1 lg:grid-cols-4 mx-auto items-center justify-center pl-3 lg:pl-1 gap-8 my-5">
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
      </div>
    </div>
  );
};

export default TrendingAuctions;

import React from "react";
import CreatorCard from "../Cards/CreatorCard";

const CreatorOfTheWeek = () => {
  return (
    <div className="lg:px-16 px-8 mt-7 mb-10 text-black dark:text-gray-400">
      <div className="flex flex-row text-xl items-center text-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-2 mr-3"
        >
          <path
            d="M17.2 5.10001H23.6L32 16L23.6 26.9H17.3L25.6 16L17.2 5.10001Z"
            fill="#feb019"
          ></path>
          <path
            opacity="0.8"
            d="M23.6 5.10001H3.4C0 5.10001 0 8.40001 0 8.40001C0 8.40001 0 20.2 0 23.6C0 27 3.4 27 3.4 27H19.4L20.7 25.3H3.4C2.6 25.3 1.7 25 1.7 23.6V8.40001C1.7 7.60001 2 6.70001 3.4 6.70001H22.8L30 16L21.6 26.9H23.7L32 16L23.6 5.10001ZM5.1 21.9V23.6H16.9V21.9C16.4 21.9 15.6 21.8 14.9 21.4C14.1 21.1 13.6 20.4 13.6 19.4C14.6 18.6 15.3 17.4 15.3 16V11.8H13.6V16C13.6 17.4 12.4 18.5 11.1 18.5C9.8 18.5 8.4 17.4 8.4 16V12.6C8.4 11.3 9.6 10.1 10.9 10.1H15.1V8.40001H10.9C8.5 8.40001 6.7 10.3 6.7 12.6V16C6.7 17.3 7.4 18.6 8.4 19.4C8.4 21.5 6 21.9 5.1 21.9ZM10 20.1C10.6 20.3 11.2 20.3 11.8 20.1C12 20.9 12.2 21.4 12.6 21.9H9.1C9.6 21.4 9.9 20.8 10 20.1Z"
            className="fill-black dark:fill-gray-500"
          ></path>
        </svg>
        TOP CREATOR
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-2xl lg:text-3xl font-semibold">Creator of the Week</div>
        <div className="text-lg lg:text-xl relative transition border-2 border-transparent rounded-sm hover:border-[#feb019]">
          VIEW ALL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:pl-7 lg:grid-cols-4 mx-auto items-center justify-center pl-3 lg:pl-1  gap-8 my-5">
        <CreatorCard />
        <CreatorCard background="/bg2.jpg" />
        <CreatorCard background="/bg3.jpg" />
        <CreatorCard background="/bg4.jpg" />
      </div>
    </div>
  );
};

export default CreatorOfTheWeek;

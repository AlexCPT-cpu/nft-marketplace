import fetch from "@/helpers/fetch";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CollectionCard from "../Cards/CollectionCard";

const TopCollections = () => {

  const [collections, setColls] = useState<any[]>([])

  useEffect(() => {
    const get = async () => {
      const response = await fetch("GET", "/api/getCollections");
      setColls(response?.data);
    };

    get();
  }, []);

  return (
    <div className="lg:px-16 px-8 mt-7 mb-10 text-black dark:text-gray-400">
      <div className="flex flex-row text-xl items-center text-center">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-2 mr-3"
        >
          <path
            d="M10 36H32C33.1 36 34 35.1 34 34V30H10V36ZM10 24H32C33.1 24 34 23.1 34 22V18H10V24ZM10 12H32C33.1 12 34 11.1 34 10V6H10V12Z"
            fill="#feb019"
          ></path>
          <path
            opacity="0.8"
            d="M32 30V34H17V28H34C34 26.9 33.1 26 32 26H15V29.6L11.4 26H6C4.9 26 4 26.9 4 28V34C4 35.1 4.9 36 6 36H32C33.1 36 34 35.1 34 34V30H32ZM6 34V28H10.6L16.6 34H6ZM32 18V22H17V16H34C34 14.9 33.1 14 32 14H15V17.6L11.4 14H6C4.9 14 4 14.9 4 16V22C4 23.1 4.9 24 6 24H32C33.1 24 34 23.1 34 22V18H32ZM6 22V16H10.6L16.6 22H6ZM32 6V10H17V4H34C34 2.9 33.1 2 32 2H15V5.6L11.4 2H6C4.9 2 4 2.9 4 4V10C4 11.1 4.9 12 6 12H32C33.1 12 34 11.1 34 10V6H32ZM6 10V4H10.6L16.6 10H6Z"
            className="fill-black dark:fill-gray-500"
          ></path>
        </svg>
        COLLECTIONS
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-2xl lg:text-3xl font-semibold">
          Top Collections
        </div>
        <div className="text-lg lg:text-xl relative transition border-2 border-transparent rounded-md p-2 hover:border-[#feb019]">
          <Link href="/collectors">VIEW ALL</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:pl-7 grid-cols-1 lg:grid-cols-4 mx-auto items-center justify-center pl-3 lg:pl-1 gap-8 my-5">
        {collections?.map((collection) => (
          <CollectionCard
            address={collection.address}
            name={collection.name}
            sold={collection.sold}
            key={collection?.id}
            description={collection.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCollections;

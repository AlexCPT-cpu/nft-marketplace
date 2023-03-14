import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import TableLayout from "./TableLayout";
import TableChild from "./TableChild";

const RankingTable = () => {
  const inputElt = useRef(null);
  const [value, setValue] = useState<string>("");

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
          <TableChild
            floor={0.03}
            owners={200}
            items={234}
            volume={0.866}
            tw4={-24.43}
            svd={-234.56}
            name="Ella Cammpbell"
          />
          <TableChild
            floor={0.6}
            owners={46}
            items={84}
            volume={1.56}
            tw4={64.34}
            svd={435.52}
            name="Joe West"
          />
          <TableChild
            floor={1.43}
            owners={28}
            items={400}
            volume={0.866}
            tw4={-24.43}
            svd={35.54}
            name="Maddie Griph"
          />
          <TableChild
            floor={0.01}
            owners={42}
            items={63}
            volume={0.866}
            tw4={-36.765}
            svd={-345.46}
            name="Joao Felix"
          />
        </TableLayout>{" "}
      </div>

      <div className="my-6 text-black dark:text-gray-500 font-semibold font-lg">
        Showing {1} to {4} of {4} entries
      </div>

      <div className="flex ml-auto flex-end justify-end">
      <div className="divide-x divide-white dark:divide-black">
        <button className="px-4 py-1 bg-neutral-200 rounded-sm cursor-pointer dark:bg-[#041824]">Previous</button>
        <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">1</button>
        <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">2</button>
        <button className="px-4 py-1 bg-[#feb019] hover:bg-opacity-80 cursor-pointer">3</button>
        <button className="px-4 py-1 bg-neutral-200 rounded-sm cursor-pointer dark:bg-[#041824]">Next</button>
      </div>
      </div>


    </div>
  );
};

export default RankingTable;

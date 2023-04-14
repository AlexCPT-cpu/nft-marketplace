import React from "react";
import Chart from "./Chart";
import RankingTable from "../Activity/ActivityTable";

const CollectionData = () => {
  return (
    <div className="w-full">
      <div className="text-left text-black dark:text-[#8F8F8F]">
        <h3 className="text-sm">Avg. Price</h3>
        <h1 className="text-2xl font-bold">0.7719 BNB</h1>
      </div>
      <div className="flex flex-row text-left mt-3 mb-0 space-x-6 text-xs text-black dark:text-[#5B5B5B]">
        <h3>PERCENTAGE</h3>
        <h3>PERIODS</h3>
      </div>
      <div className="flex flex-row space-x-5 text-2xl font-semibold text-left text-black dark:text-[#5B5B5B]">
        <h1 className="text-[#0ecb81]">+2.61%</h1>
        <h1>1 Years</h1>
      </div>
      <div className="flex justify-center">
      <Chart />
      </div>
      <RankingTable />
    </div>
  );
};

export default CollectionData;

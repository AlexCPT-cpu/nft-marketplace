import { HistoryProps } from "@/types/types";
import React from "react";

const History = ({ title, sub, item1, item2 }: HistoryProps) => {
  return (
    <div>
      <div className="text-[#feb019] text-2xl font-semibold">History</div>
      <div className="p-4 dark:text-neutral-500 my-4 border rounded-sm border-dashed border-black dark:border-white">
        {title}
        <p className="my-4"> {sub}</p>

        <ul className="ml-10 mb-4">
          <li>{item1}</li>
          <li>{item2}</li>
        </ul>
      </div>
    </div>
  );
};

History.defaultProps = {
  title: "Human Art dressed in iconic Hand Canvas Carft.",
  sub: "Meta Netas are handmade Pixelart which will be releasing Various versions of famous national and international Netas.",
  item1: "Each Meta Neta Will have Maximum 11 Unique versions.",
  item2:
    "Holder of 3 or more Meta Netas will be eligible for Air Drop in Future.",
};

export default History;

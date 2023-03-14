import React from "react";
import { LayoutProps } from "@/types/types";

const TableLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rounded-md bg-gray-100 dark:bg-[#041824] text-black dark:text-gray-400">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              COLLECTION
            </th>
            <th scope="col" className="px-6 py-3">
              VOLUME
            </th>
            <th scope="col" className="px-6 py-3">
              24H%
            </th>
            <th scope="col" className="px-6 py-3">
              7D%
            </th>
            <th scope="col" className="px-6 py-3">
              FLOOR PRICE
            </th>
            <th scope="col" className="px-6 py-3">
              OWNERS
            </th>
            <th scope="col" className="px-6 py-3">
              ITEMS
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableLayout;

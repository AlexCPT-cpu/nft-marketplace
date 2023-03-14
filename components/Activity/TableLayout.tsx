import React from "react";
import { LayoutProps } from "@/types/types";

const TableLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rounded-md bg-gray-100 dark:bg-[#041824] text-black dark:text-gray-400">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              EVENTS
            </th>
            <th scope="col" className="px-6 py-3">
              ITEMS
            </th>
            <th scope="col" className="px-6 py-3">
              PRICE
            </th>
            <th scope="col" className="px-6 py-3">
              FROM
            </th>
            <th scope="col" className="px-6 py-3">
              TO
            </th>
            <th scope="col" className="px-6 py-3">
              TIME
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableLayout;

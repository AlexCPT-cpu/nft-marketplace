import { ActivityItemProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  StarIcon,
  ShoppingCartIcon,
  ListBulletIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

const EventIcon: React.FC<{ event: string }> = ({ event }) => {
  if (event === "Offer Made") {
    return <StarIcon className="w-10 mr-3 fill-[#feb019]" />;
  } else if (event === "Sell") {
    return <ShoppingCartIcon className="w-10 mr-3 fill-[#feb019]" />;
  } else if (event === "Buy") {
    return <BuildingLibraryIcon className="w-10 mr-3 fill-[#feb019]" />;
  } else {
    return <ListBulletIcon className="w-10 mr-3 fill-[#feb019]" />;
  }
};

const TableChild = ({
  event,
  items,
  price,
  from,
  to,
  time,
}: ActivityItemProps) => {
  return (
    <tr className="mb-2 cursor-pointer border-t-slate-900 dark:border-t-gray-700 border-t-0 hover:border-t">
      <td
        scope="row"
        className="px-6 py-4 whitespace-nowrap capitalize flex flex-row justify-start content-center items-center"
      >
        <EventIcon event={event!} />
        {event}
      </td>

      <td scope="row" className="px-6 py-4 mr-3 whitespace-nowrap">
        <div className="flex flex-row items-center">
          <Image
            className="rounded-lg mr-4"
            src={items?.image! ?? "/poke.jpg"}
            alt={items?.name! ?? ""}
            width={40}
            height={40}
          />
          {items?.name!}
        </div>
      </td>

      <td scope="row" className="px-6 py-4 whitespace-nowrap">
        {price?.toFixed(3) ?? "- -"}&nbsp;BNB
      </td>

      <td
        scope="row"
        className="px-6 py-4 whitespace-nowrap text-green-500 hover:text-green-500/70"
      >
        <Link href="/">{from ?? "- -"}</Link>
      </td>
      <td scope="row" className="px-6 py-4 whitespace-nowrap">
        <Link href="/">{to ?? "- -"}</Link>
      </td>
      <td scope="row" className="px-6 py-4 whitespace-nowrap">
        {time ?? "- -"}
      </td>
    </tr>
  );
};

TableChild.defaultProps = {
  event: "Offer Made",
  items: {
    name: "Mango Art",
    image: "/poke.jpg",
  },
  price: 0.07,
  from: "Franklin",
  to: "Havertz",
  time: "25 minutes ago",
};

export default TableChild;

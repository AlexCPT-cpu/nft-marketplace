import fetch from "@/helpers/fetch";
import React, { useEffect, useState } from "react";
import { Activity } from "@prisma/client";
import truncateEthAddress from "truncate-eth-address";
import TableLayout from "../Activity/TableLayout";
import TableChild from "../Activity/TableChild";

const TradeHistory = ({
  address,
  nftId,
}: {
  address: string;
  nftId: string | number;
}) => {
  const [activity, setActivity] = useState<Activity[]>();

  useEffect(() => {
    const getActive = async () => {
      const res = await fetch("POST", "/api/history", {
        address,
        nftId,
      });
      setActivity(res?.data);
    };

    getActive();
  }, [address, nftId]);

  return (
    <div className="overflow-auto px-10">
      {/* <TableLayout>
        {activity?.map((item: Activity) => (
          <TableChild
            key={item.id}
            event={item.activityType!}
            items={item}
            price={item.price!}
            from={truncateEthAddress(item.from!)}
            to={truncateEthAddress(
              item.to != ""
                ? item.to!
                : "0x0000000000000000000000000000000000000000"
            )}
            time="21 minutes ago"
          />
        ))}
      </TableLayout> */}
    </div>
  );
};

export default TradeHistory;

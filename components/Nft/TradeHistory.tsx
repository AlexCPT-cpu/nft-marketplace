import fetch from "@/helpers/fetch";
import React, { useEffect, useState } from "react";
import { Activity } from "@prisma/client";
import truncateEthAddress from "truncate-eth-address";
import TableLayout from "../Activity/TableLayout";
import TableChild from "../Activity/TableChild";
import HistoryCard from "./HistoryCard";

const TradeHistory: React.FC<any> = ({ address, nftId }) => {
  const [activity, setActivity] = useState<Activity[]>();

  useEffect(() => {
    const getActive = async () => {
      const res = await fetch("POST", "/api/history", {
        address,
        nftId,
      });
      setActivity([res?.data]);
    };

    getActive();
  }, [address, nftId]);

  return (
    <div className="overflow-auto px-10">
      {activity?.map((active: Activity, index: number) =>
        active == null || undefined ? (
          <div key={index}></div>
        ) : (
          <HistoryCard activity={active} key={index} />
        )
      )}
    </div>
  );
};

export default TradeHistory;

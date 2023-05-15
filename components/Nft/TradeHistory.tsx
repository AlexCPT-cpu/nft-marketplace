import fetch from "@/helpers/fetch";
import React, { useEffect, useState } from "react";
import { Activity } from "@prisma/client";
import truncateEthAddress from "truncate-eth-address";
import TableLayout from "../Activity/TableLayout";
import TableChild from "../Activity/TableChild";
import HistoryCard from "./HistoryCard";

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
      setActivity([res?.data]);
    };

    getActive();
  }, [address, nftId]);

  return (
    <div className="overflow-auto px-10">
      {activity?.map((active: Activity) => (<HistoryCard activity={active} key={active.id} />))}
      
    </div>
  );
};

export default TradeHistory;

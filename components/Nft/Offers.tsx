import useBid from "@/hooks/bids/useBid";
import React from "react";

const Offers = ({
  address,
  nftId,
}: {
  address: string;
  nftId: string | number;
}) => {

  const { bid } = useBid(address, nftId)
  console.log(bid)
  return (<div>Offers</div>);
};

export default Offers;

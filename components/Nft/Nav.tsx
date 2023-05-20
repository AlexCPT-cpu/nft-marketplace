import fetch from "@/helpers/fetch";
import React, { useCallback, useEffect, useState } from "react";
import Offers from "./Offers";
import PropertyCard from "./PropertyCard";
import PropertyMap from "./PropertyMap";
import TradeHistory from "./TradeHistory";

const Nav = ({
  active,
  address,
  nftId,
}: {
  active: {
    one: boolean;
    two: boolean;
    three: boolean;
  };
  address: string;
  nftId: string | number;
}) => {
  const [metaData, setMetadata] = useState<any>();

  const getMetadata = useCallback(async () => {
    const response = await fetch("POST", "/api/metadata", {
      address,
      tokenId: nftId,
    });
    return response;
  }, [address, nftId]);

  useEffect(() => {
    if (address && nftId) {
      getMetadata().then((metadata) => setMetadata(metadata));
    }
  }, [getMetadata, address, nftId]);

  if (active.one) {
    return (
      <div className="w-full">
        <PropertyMap address={address} nftId={nftId} metaData={metaData} />
      </div>
    );
  } else if (active.two) {
    return (
      <div className="w-full">
        <TradeHistory address={address} nftId={nftId} />
      </div>
    );
  } else if (active.three) {
    return (
      <div className="w-full">
        <Offers address={address} nftId={nftId} />
      </div>
    );
  }
  return (
    <div className="w-full">
      <PropertyMap address={address} nftId={nftId} metaData={metaData} />
    </div>
  );
};

export default Nav;

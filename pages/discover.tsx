import NftGrid from "@/components/Grid/NftGrid";
import Meta from "@/components/Meta/Meta";
import React from "react";

const discover = () => {
  return (
    <div>
      <Meta
        title="NFT Marketplace Discover"
        desc="nft auction and marketplace"
      />
      <NftGrid />
    </div>
  );
};

export default discover;

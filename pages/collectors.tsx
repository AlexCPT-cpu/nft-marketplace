import CollectorsGrid from "@/components/Grid/CollectorsGrid";
import Meta from "@/components/Meta/Meta";
import React from "react";

const collectors = () => {
  return (
    <div>
      <Meta
        title="NFT Marketplace Collectors"
        desc="nft auction and marketplace"
      />
      <CollectorsGrid />
    </div>
  );
};

export default collectors;

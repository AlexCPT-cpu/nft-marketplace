import CreatorsGrid from "@/components/Grid/CreatorsGrid";
import CreatorOfTheWeek from "@/components/Home/CreatorOfTheWeek";
import Meta from "@/components/Meta/Meta";
import React from "react";

const creators = () => {
  return (
    <div>
      <Meta
        title="NFT Marketplace Creators"
        desc="nft auction and marketplace"
      />
      <CreatorsGrid />
    </div>
  );
};

export default creators;

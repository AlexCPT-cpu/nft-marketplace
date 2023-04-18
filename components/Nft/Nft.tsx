import React from "react";
import NftCard from "./NftCard";
import Properties from "./Properties";

const Nft = ({ nft, collection }: { nft: any; collection: string }) => {

  return (
    <div className="flex w-full flex-col">
      <NftCard
        fullData={nft}
        nftId={nft[0]?.tokenId}
        name={nft[0]?.rawMetadata?.name}
        CollectionName={nft[0]?.title}
        nftAddress={collection}
        image={nft[0]?.media[0]?.thumbnail}
      />
      <Properties />
    </div>
  );
};

export default Nft;

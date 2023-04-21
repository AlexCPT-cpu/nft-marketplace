import React, { useEffect, useMemo, useState } from "react";
import UserNftCard from "../Cards/UserNftCard";
import { NftData, UserNftGrid } from "@/types/types";
import { factoryCompared } from "@/config/config";

const UserNftGrid: React.FC<UserNftGrid> = ({ active, userNfts }) => {
  const [currentNfts, setCurrentNfts] = useState<any>([]);

  const navNfts = useMemo(() => {
    const returned: NftData[] = [];
    //@ts-ignore
    if (userNfts) {
      userNfts[0]?.map((nft: NftData) => {
        if (nft.contract?.address === factoryCompared) {
          returned.push(nft);
        }
      });
    }
    return returned;
  }, [userNfts]);

  useEffect(() => {
    if (active?.created === true) {
      setCurrentNfts(navNfts);
    } else if (active?.collected === true) {
      setCurrentNfts(userNfts[0]);
    } else if (active?.collections === true) {
      setCurrentNfts(navNfts);
    } else if (active?.offersMade === true) {
      setCurrentNfts(navNfts);
    } else if (active?.offersReceived === true) {
      setCurrentNfts(userNfts[0]);
    }
  }, [active, userNfts, navNfts]);

  const NavItem = ({ nft }: { nft: NftData }) => {
    if (active?.created === true)
      return (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      );
    else if (active?.collected === true)
      return (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      );
    else if (active?.collections === true)
      return (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      );
    else if (active?.offersMade === true)
      return (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      );
    else if (active?.offersReceived === true)
      return (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      );
    return <div></div>;
  };

  return (
    <div className="grid grid-cols-1 transition duration-200 md:grid-cols-2 md:pl-6 lg:grid-cols-4 mx-auto items-center justify-center pl-1 gap-8">
      {currentNfts?.map((nftItem: NftData, i: number) => {
        return <NavItem nft={nftItem} key={i} />;
      })}
    </div>
  );
};

export default UserNftGrid;

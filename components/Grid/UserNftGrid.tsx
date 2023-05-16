import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserNftCard from "../Cards/UserNftCard";
import { NftData, UserNftGrid } from "@/types/types";
import { factoryCompared } from "@/config/config";
import OffersMade from "../User/OffersMade";
import OffersReceived from "../User/OffersReceived";
import getBids from "@/helpers/getBids";
import fetch from "@/helpers/fetch";
import getListings from "@/helpers/getListed";

const UserNftGrid: React.FC<UserNftGrid> = ({ active, userNfts, address }) => {
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

  const getNFTs = useCallback(async () => {
    const { data } = await fetch("GET", "/api/collection");
    const bidCall = await data.map(async (item: any) => {
      const { bids } = await getBids(item.address!, address!);
      //@ts-ignore
      return { contract: item.address, data: bids };
    });
    const response = await Promise.all(bidCall);
    return response;
  }, [address]);

  const getList = useCallback(async () => {
    const { data } = await fetch("GET", "/api/collection");
    const listCall = await data.map(async (item: any) => {
      const { listings } = await getListings(item.address);
      //@ts-ignore
      return { contract: item.address, data: listings };
    });
    const response = await Promise.all(listCall);
    return response;
  }, []);

  useEffect(() => {
    if (active?.created === true) {
      if (userNfts) {
        setCurrentNfts(navNfts);
      }
    } else if (active?.collected === true) {
      if (userNfts) {
        setCurrentNfts(userNfts[0]);
      }
    } else if (active?.collections === true) {
      if (userNfts) {
        setCurrentNfts(navNfts);
      }
    } else if (active?.offersMade === true) {
      getNFTs().then((bids) => setCurrentNfts(bids));
    } else if (active?.offersReceived === true) {
      getList().then((list) => setCurrentNfts(list));
    }
  }, [active, userNfts, navNfts, address, getNFTs, getList]);

  const NavItem = ({ nft }: { nft: NftData }) => {
    if (active?.created === true)
      return (
        <UserNftCard
        image={nft?.media[0]?.thumbnail}
        name={nft?.title}
        nftAddress={nft?.contract?.address}
        nftId={nft?.tokenId}
        />
      );
    else if (active?.collected === true)
      return (
        <UserNftCard
        image={nft?.media[0]?.thumbnail}
        name={nft?.title}
        nftAddress={nft?.contract?.address}
        nftId={nft?.tokenId}
        />
      );
    else if (active?.collections === true)
      return (
        <UserNftCard
          image={nft?.media[0]?.thumbnail}
          name={nft?.title}
          nftAddress={nft?.contract?.address}
          nftId={nft?.tokenId}
        />
      );
    else if (active?.offersMade === true)
      return (
        <div className="w-full">
          <OffersMade Data={nft} />
        </div>
      );
    else if (active?.offersReceived === true)
      return (
        <div className="w-full">
          <OffersReceived address={address} Data={nft} />
        </div>
      );
    return <div></div>;
  };

  return (
    <>
      {active?.offersMade || active?.offersReceived ? (
        <div className="w-full">
          {currentNfts?.map((nftItem: NftData, i: number) => {
            return <NavItem nft={nftItem} key={i} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 w-full transition duration-200 md:grid-cols-2 md:pl-6 lg:grid-cols-4 mx-auto items-center justify-center pl-1 gap-8">
          {currentNfts?.map((nftItem: NftData, i: number) => {
            return <NavItem nft={nftItem} key={i} />;
          })}
        </div>
      )}
    </>
  );
};

export default UserNftGrid;

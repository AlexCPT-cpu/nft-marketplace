import React, { useEffect, useState } from "react";
import UserNftCard from "../Cards/UserNftCard";
import { NftData, UserNftGrid } from "@/types/types";
import { useAccount } from "wagmi";
import axios from "axios";
import getCollectionName from "@/helpers/getCollectionName";

const UserNftGrid: React.FC<UserNftGrid> = ({ active }) => {
  const { address } = useAccount();
  const [userNfts, setUserNfts] = useState<any>([]);

  useEffect(() => {
    const getNFTs = async () => {
      const response = await axios.post("/api/nfts", {
        address: address,
      });
      return response.data;
    };
    if (address) {
      getNFTs().then((data) => setUserNfts([data?.ownedNfts]));
    }
  }, [address]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:pl-6 lg:grid-cols-4 mx-auto items-center justify-center pl-1 gap-8">
      {userNfts[0]?.map((nft: NftData, i: number) => {
        console.log(nft)
        return (
          <UserNftCard
            key={i}
            image={nft.media[0]?.thumbnail}
            name={nft.title}
            nftAddress={nft.contract.address}
          />
        );
      })}
    </div>
  );
};

export default UserNftGrid;

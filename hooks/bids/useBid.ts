import { useContractRead } from "wagmi";
import { marketPlace } from "@/config/config";
import Marketplace from "@/config/Marketplace.json";

const useBid = (collectionAddr: string, nftId: string | number) => {
  const { data: bids } = useContractRead({
    // @ts-ignore
    address: marketPlace,
    abi: Marketplace,
    functionName: "getTokenBids",
    args: [collectionAddr, nftId],
  });

  return { bids };
};

export default useBid;

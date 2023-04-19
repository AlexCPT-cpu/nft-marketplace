import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { MarketContext } from "@/context/marketplaceContext";

const useCreateAuction = (
  collectionAddress: string,
  tokenId: string | number,
  payToken: string,
  price: string | number,
  minBid: string | number,
  startTime: string | number,
  endTime: string | number
) => {
  const { config: auctionConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: marketPlace,
    abi: Marketplace,
    functionName: "createAuction",
    args: [
      collectionAddress,
      tokenId,
      payToken,
      price,
      minBid,
      startTime,
      endTime,
    ],
  });

  const { data, write: callCreateAuction } = useContractWrite({
    ...auctionConfig,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    onMutate({ args, overrides }: any) {
      console.log("Mutate", { args, overrides });
    },
  });

  return { callCreateAuction, data };
};

export default useCreateAuction;

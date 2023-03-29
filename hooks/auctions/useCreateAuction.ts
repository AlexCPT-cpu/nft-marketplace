import { AcceptOffer, CreateAuctionProps, CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCreateAuction = ({ collectionAddress, tokenId, payToken, price, minBid, startTime, endTime }: CreateAuctionProps) => {
    const { config: auctionConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "createAuction",
        args: [collectionAddress, tokenId, payToken, price, minBid, startTime, endTime],
      });
    
      const { write: callCreateAuction } = useContractWrite({
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

  return { callCreateAuction }
}

export default useCreateAuction
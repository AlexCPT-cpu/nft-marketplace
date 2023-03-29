import { AcceptOffer, CreateAuctionProps, CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCancelAuction = ({ collectionAddress, tokenId }: CreateAuctionProps) => {
    const { config: auctionConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "cancelAuction",
        args: [collectionAddress, tokenId],
      });
    
      const { write: callCancelAuction } = useContractWrite({
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

  return { callCancelAuction }
}

export default useCancelAuction
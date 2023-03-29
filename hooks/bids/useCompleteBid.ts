import { AcceptOffer, CreateAuctionProps, CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCompleteBid = ({ collectionAddress, tokenId }: CreateAuctionProps) => {
    const { config: bidConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "completeBid",
        args: [collectionAddress, tokenId],
      });
    
      const { write: callCompleteBid } = useContractWrite({
        ...bidConfig,
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

  return { callCompleteBid }
}

export default useCompleteBid
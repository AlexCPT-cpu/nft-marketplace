import { AcceptOffer, CreateAuctionProps, CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const usePlaceBid = ({ collectionAddress, tokenId, minBid }: CreateAuctionProps) => {
    const { config: bidConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "placeBid",
        args: [collectionAddress, tokenId, minBid],
      });
    
      const { write: callPlaceBid } = useContractWrite({
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

  return { callPlaceBid }
}

export default usePlaceBid
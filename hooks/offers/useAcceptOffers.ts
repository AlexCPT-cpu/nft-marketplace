import { AcceptOffer, CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useAcceptOffer = ({ collectionAddress, tokenId, offerer }: AcceptOffer) => {
    const { config: offerConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "acceptOfferNFT",
        args: [collectionAddress, tokenId, offerer],
      });
    
      const { write: callAcceptOffer } = useContractWrite({
        ...offerConfig,
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

  return { callAcceptOffer }
}

export default useAcceptOffer
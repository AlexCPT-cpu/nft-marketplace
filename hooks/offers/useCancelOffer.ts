import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCancelOffer = ({ collectionAddress, tokenId }: CreateSell) => {
    const { config: offerConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "cancelOffer",
        args: [collectionAddress, tokenId],
      });
    
      const { write: callCancelOffer } = useContractWrite({
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

  return { callCancelOffer }
}

export default useCancelOffer
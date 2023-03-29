import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useOffer = ({ collectionAddress, tokenId, payToken, price }: CreateSell) => {
    const { config: offerConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "makeOffer",
        args: [collectionAddress, tokenId, payToken, price],
      });
    
      const { write: callOffer } = useContractWrite({
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

  return { callOffer }
}

export default useOffer
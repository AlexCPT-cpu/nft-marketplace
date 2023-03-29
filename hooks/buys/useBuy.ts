import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useBuy = ({ collectionAddress, tokenId, payToken, price }: CreateSell) => {
    const { config: buyConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "buy",
        args: [collectionAddress, tokenId, payToken, price],
      });
    
      const { write: callBuy } = useContractWrite({
        ...buyConfig,
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

  return { callBuy }
}

export default useBuy
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite } from "wagmi";

const useBuy = (collectionAddress: string, tokenId: string| number, payToken: string, price: string) => {
    const { config: buyConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "buy",
        args: [collectionAddress, tokenId, payToken, price],
      });
    
      const { data, write: callBuy } = useContractWrite({
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

  return { callBuy, data }
}

export default useBuy
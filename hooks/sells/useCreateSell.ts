import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCreateSell = ({ collectionAddress, tokenId, payToken, price }: CreateSell) => {
    const { config: createConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "createSell",
        args: [collectionAddress, tokenId, payToken, price],
      });
    
      const { write: callCreate } = useContractWrite({
        ...createConfig,
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

  return { callCreate }
}

export default useCreateSell
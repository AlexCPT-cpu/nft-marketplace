import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useCancel = ({ collectionAddress, tokenId }: CreateSell) => {
    const { config: cancelConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "cancelListedNFT",
        args: [collectionAddress, tokenId],
      });
    
      const { write: callCancel } = useContractWrite({
        ...cancelConfig,
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

  return { callCancel }
}

export default useCancel
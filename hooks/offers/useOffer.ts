import { CreateSell } from "@/types/types";
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const useOffer = (collectionAddress: string, tokenId: string | number, payToken: string, price: number ) => {
    const { config: offerConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "makeOffer",
        args: [collectionAddress, tokenId, payToken, price],
      });
    
      const { data, write: callOffer } = useContractWrite({
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

  return { callOffer, data }
}

export default useOffer
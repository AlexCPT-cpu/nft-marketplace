import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const useCompleteBid = (collectionAddress: string, tokenId: string | number, bidder: string, price: number) => {
    const { config: bidConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "acceptBidForToken",
        args: [collectionAddress, tokenId, bidder, price],
      });
    
      const { data, write: callCompleteBid } = useContractWrite({
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

  return { callCompleteBid, data }
}

export default useCompleteBid
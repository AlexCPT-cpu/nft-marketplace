import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";


const usePlaceBid = (collectionAddress: string, tokenId: string | number, price: string | number, date: Date) => {

  const timestamp = (Math.floor(new Date(date!).getTime() / 1000) + 150)
    const { config: bidConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "enterBidForToken",
        args: [collectionAddress, tokenId, price, timestamp],
      });
    
      const { data, write: callPlaceBid } = useContractWrite({
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

  return { callPlaceBid, data }
}

export default usePlaceBid
import Marketplace from '@/config/Marketplace.json'
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect, useState } from 'react';
import blockTimestamp from '@/helpers/blockTimestamp';

const usePlaceBid = (collectionAddress: string, tokenId: string | number, price: string | number) => {

  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const x = async () => {
      return await blockTimestamp();
    };

    x().then((time) => setTimestamp(time));
  }, [price, collectionAddress, tokenId]);

    const { config: bidConfig } = usePrepareContractWrite({
        // @ts-ignore
        address: marketPlace,
        abi: Marketplace,
        functionName: "enterBidForToken",
        args: [collectionAddress, tokenId, price, timestamp + 9200],
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
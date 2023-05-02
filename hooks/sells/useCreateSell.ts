import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import blockTimestamp from "@/helpers/blockTimestamp";
import { useEffect, useState } from "react";

const useCreateSell = (
  collectionAddress: string,
  tokenId: string | number,
  payToken: string,
  price: string
) => {
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const x = async () => {
      return await blockTimestamp();
    };

    x().then((time) => setTimestamp(time));
  }, [price, collectionAddress, tokenId]);

  const { config: createConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: marketPlace,
    abi: Marketplace,
    functionName: "listToken",
    args: [collectionAddress, tokenId, price, timestamp + 7200],
  });

  const { data, write: callCreate } = useContractWrite({
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

  return { callCreate, data };
};

export default useCreateSell;

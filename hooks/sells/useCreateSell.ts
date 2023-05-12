import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const useCreateSell = (
  collectionAddress: string,
  tokenId: string | number,
  payToken: string,
  price: string,
  date: Date
) => {
  
  const timestamp = (Math.floor(new Date(date!).getTime() / 1000) + 150)

  const { config: createConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: marketPlace,
    abi: Marketplace,
    functionName: "listToken",
    args: [collectionAddress, tokenId, price, timestamp],
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

import Marketplace from "@/config/Marketplace.json";
import { marketPlace } from "@/config/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { MarketContext } from "@/context/marketplaceContext";

const useCreateSell = (
  collectionAddress: string,
  tokenId: string | number,
  payToken: string,
  price: string
) => {
  const { collAddress } = MarketContext();
  const { config: createConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: marketPlace,
    abi: Marketplace,
    functionName: "createSell",
    args: [collAddress, tokenId, payToken, price],
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

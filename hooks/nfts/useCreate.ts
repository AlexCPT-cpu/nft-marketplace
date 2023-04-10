
import Factory from "@/config/Factory.json";
import { factory } from "@/config/config";
import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const useCreate = (fileUrl: string) => {


  const { config: createConfig } = usePrepareContractWrite({
    address: factory,
    abi: Factory,
    functionName: "createNFT",
    args: [fileUrl],
  });

  const { data, write } = useContractWrite({
    ...createConfig,
    onError(error) {
      console.log("Error", error);
    }
  });
  data?.wait(2)

  return { write, data }
}

export default useCreate
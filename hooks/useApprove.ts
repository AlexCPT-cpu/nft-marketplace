import { marketPlace } from "@/config/config";
import NftAbi from "@/config/NftAbi.json";
import { useContractWrite, useContractRead, usePrepareContractWrite, useAccount } from "wagmi";

const useApprove = (collectionAddress: string) => {


  const { address: userAddress } = useAccount();

  const { data: isApproved } = useContractRead({
    // @ts-ignore
    address: collectionAddress,
    abi: NftAbi,
    functionName: "isApprovedForAll",
    args: [userAddress, marketPlace],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: collectionAddress,
    abi: NftAbi,
    functionName: "setApprovalForAll",
    args: [marketPlace, true],
  });

  const { data, write: callApprove } = useContractWrite({
    ...approveConfig,
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

  return { isApproved, callApprove, data }
};

export default useApprove;

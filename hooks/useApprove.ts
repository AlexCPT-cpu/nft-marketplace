import { marketPlace } from "@/config/config";
import NftAbi from "@/config/NftAbi.json";
import { ApproveProps } from "@/types/types";
import { useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const useApprove = ({ collectionAddress }: ApproveProps) => {

  const { address: userAddress } = useAccount();

  const { data: isApproved, isLoading: loadingApprove } = useContractRead({
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

  const { write: callApprove } = useContractWrite({
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

  return { isApproved, callApprove }
};

export default useApprove;

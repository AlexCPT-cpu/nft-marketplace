import {
  erc20ABI,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";
import { BNB, marketPlace } from "@/config/config";
import { ethers } from "ethers";

const useBalance = () => {

  const { address } = useAccount();

  const { data: balance } = useContractRead({
    // @ts-ignore
    address: BNB,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address!],
  });

  const { data: allowance } = useContractRead({
    // @ts-ignore
    address: BNB,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address!, marketPlace],
  });

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: BNB,
    abi: erc20ABI,
    functionName: "approve",
    args: [marketPlace!, ethers.utils.parseUnits("50000000000000000000", "ether"),],
  });

  const { data: wethAwData, write: wethApprove } = useContractWrite(config);


  return { balance, wethAwData, wethApprove, allowance };
};

export default useBalance;

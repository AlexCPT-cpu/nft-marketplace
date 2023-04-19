import { erc20ABI, usePrepareContractWrite, useContractWrite } from "wagmi";
import { USDT, BUSD, BNB, marketPlace } from "@/config/config";
import { ethers } from "ethers";

const useTokens = () => {

  const { config: usdtConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: USDT,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      marketPlace,
      ethers.utils.parseUnits("50000000000000000000", "ether"),
    ],
  });
  const { data: usdtData, write: approveUsdt } = useContractWrite(usdtConfig);

  const { config: busdConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: BUSD,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      marketPlace,
      ethers.utils.parseUnits("50000000000000000000", "ether"),
    ],
  });
  const { data: busdData, write: approveBusd } = useContractWrite(busdConfig);

  const { config: bnbConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: BNB,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      marketPlace,
      ethers.utils.parseUnits("50000000000000000000", "ether"),
    ],
  });
  const { data: bnbData, write: approveBnb } = useContractWrite(bnbConfig);

  return { approveUsdt, approveBusd, approveBnb, usdtData, busdData, bnbData };
};

export default useTokens;

import { useContractRead, erc20ABI, useAccount } from "wagmi";
import { USDT, BUSD, BNB, marketPlace } from "@/config/config";

const useApproveTokens = () => {
  const { address } = useAccount();

  const { data: usdtApprove } = useContractRead({
    // @ts-ignore
    address: USDT,
    abi: erc20ABI,
    functionName: "allowance",
    args: [
      address ?? "0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A",
      marketPlace,
    ],
  });

  const { data: busdApprove } = useContractRead({
    // @ts-ignore
    address: BUSD,
    abi: erc20ABI,
    functionName: "allowance",
    args: [
      address ?? "0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A",
      marketPlace,
    ],
  });

  const { data: bnbApprove } = useContractRead({
    // @ts-ignore
    address: BNB,
    abi: erc20ABI,
    functionName: "allowance",
    args: [
      address ?? "0x7c13C3B93b6c80E5ff6D47B7ffFB7C599E9D960A",
      marketPlace,
    ],
  });
//@ts-ignore
  return { usdtApprove: parseInt(usdtApprove), busdApprove: parseInt(busdApprove), bnbApprove: parseInt(bnbApprove) };
};

export default useApproveTokens;

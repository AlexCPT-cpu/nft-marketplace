import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { WETH } from '@/config/config'
import Weth from '@/config/Weth.json'
import { ethers } from 'ethers'

const useConvert = (value: string) => {

  const { address } = useAccount()

  const { config: convertConfig } = usePrepareContractWrite({
    // @ts-ignore
    address: WETH,
    abi: Weth,
    functionName: "deposit",
    overrides: {
      //@ts-ignore
      from: address,
      value: Number(value),
    },
  });

  const { data, write: convert } = useContractWrite(convertConfig);

  return { data, convert }
}

export default useConvert
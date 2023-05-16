import { ethers } from "ethers";
import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../Forms/FormInput";
import { useBalance, useAccount, useNetwork } from "wagmi";
import Eth from "../Svg/Eth";

const Weth = ({
  price,
  setPrice,
}: {
  price: string;
  setPrice: (price: string) => void;
}) => {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const balance = useBalance({
    address: address,
    chainId: chain?.id
  })

  return (
    <div>
      <div className="text-center my-2 font-bold text-lg">
        Convert to WETH to BID
      </div>
      <div className="border p-2 mt-4 mb-3 rounded-xl border-blue-400/20 flex flex-row w-full">
        <input
          value={price}
          onChange={(e) => {
            setPrice(e.currentTarget?.value);
          }}
          placeholder="0.00"
          type="number"
          className="bg-none outline-none w-full py-1"
        />
        <div className="font-semibold flex flex-row items-center">
          WETH
          <Eth />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between my-4 mt-2 flex-row">
          <div>Your ETH balance </div>
          <div className="font-normal">{Number(balance.data?.formatted).toFixed(4)} ETH</div>
        </div>
        <div className="flex justify-between flex-row">
          <div>Your WETH balance </div>
          <div className="font-normal">0.00 WETH</div>
        </div>
      </div>
      <div className="my-4 text-center font-bold">{Number(price).toFixed(2)} ETH will be converted to {Number(price).toFixed(2)} WETH</div>
      <div className="w-full h-1 border-t-2 mt-4 border-t-black"></div>
    </div>
  );
};

export default Weth;

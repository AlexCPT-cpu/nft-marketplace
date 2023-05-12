import { ethers } from "ethers";
import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../Forms/FormInput";
import { useBalance, useAccount, useNetwork } from "wagmi";

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
          <Image
            className="mx-2"
            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIj48cGF0aCBkPSJtNy40NzEwNiAxMC4xMzgyIDQuNTMxNTQtNC41MzE1NSA0LjUzMzYgNC41MzM0NSAyLjYzNjctMi42MzY2NS03LjE3MDMtNy4xNzAxMTQtNy4xNjgwMSA3LjE2Nzk3NCAyLjYzNjU2IDIuNjM2Njl6bS03LjEzNTEyMiAxLjg2MTggMi42MzY3NTItMi42MzcxNyAyLjYzNjU2IDIuNjM2NTctMi42MzY3NSAyLjYzNjd6bTcuMTM1MTIyIDEuODYyIDQuNTMxNTQgNC41MzEzIDQuNTMzNS00LjUzMzQgMi42MzgxIDIuNjM1My0uMDAxMy4wMDE0LTcuMTcwMyA3LjE3LTcuMTY4MDEtNy4xNjgtLjAwMzc0LS4wMDM3IDIuNjQwNDktMi42MzMxem0xMC45MjQ4NC0xLjg2MDkgMi42MzY3LTIuNjM2NzcgMi42MzY2IDIuNjM2NTctMi42MzY3IDIuNjM2N3oiLz48cGF0aCBkPSJtMTQuNjc2NiAxMS45OTg2aC4wMDExbC0yLjY3NTMtMi42NzU1My0xLjk3NzUgMS45NzY5My0uMjI3MTMuMjI3Mi0uNDY4NTQuNDY4Ny0uMDAzNzMuMDAzNi4wMDM3My4wMDM4IDIuNjczMTcgMi42NzM1IDIuNjc1NS0yLjY3NTQuMDAxMy0uMDAxNS0uMDAyNS0uMDAxMyIvPjwvZz48L3N2Zz4="
            alt="Icon"
            width={50}
            height={50}
          />
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

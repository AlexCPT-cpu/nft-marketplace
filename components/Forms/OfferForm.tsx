import React, { useEffect, useMemo, useState } from "react";
import FormInput from "./FormInput";
import Image from "next/image";
import useApproveTokens from "@/hooks/useApproveTokens";
import useTokens from "@/hooks/useTokens";
import { ethers } from "ethers";
import Loader from "../Html/Loader";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { BUSD, USDT, BNB } from "@/config/config";

const OfferForm = ({
  modalOptions,
  setP,
  setToken
}: {
  modalOptions: (state: boolean) => void;
  setP: (state: string) => void;
  setToken: (state: string) => void;
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const [price, setPrice] = useState("1");
  const [active, setActive] = useState({
    eth: true,
    busd: false,
    bnb: false,
    usdt: false,
  });
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();
  
  useEffect(() => {
    if(active.busd) {
      setToken(BUSD)
    } else if(active.usdt) {
      setToken(USDT)
    } else if(active.bnb) {
      setToken(BNB)
    }
  }, [active, setToken])

  const { usdtApprove, busdApprove, bnbApprove } = useApproveTokens();
  const { approveUsdt, approveBusd, approveBnb, usdtData, bnbData, busdData } =
    useTokens();

  const waitForUsdtApprove = useWaitForTransaction({
    confirmations: 2,
    hash: usdtData?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        toast.success("Usdt Approval Successful");
        modalOptions(true);
      } else {
        console.log("error");
        setLoading(false);
        toast.error("Usdt Approval Failed");
      }
    },
  });

  const waitForBnbApprove = useWaitForTransaction({
    confirmations: 2,
    hash: bnbData?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        toast.success("Bnb Approval Successful");
        modalOptions(true);
      } else {
        console.log("error");
        setLoading(false);
        toast.error("Bnb Approval Failed");
      }
    },
  });

  const waitForBusdApprove = useWaitForTransaction({
    confirmations: 2,
    hash: busdData?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        toast.success("Busd Approval Successful");
        modalOptions(false);
      } else {
        console.log("error");
        setLoading(false);
        toast.error("Busd Approval Failed");
      }
    },
  });

  const select = (index: number) => {
    switch (index) {
      case 0:
        setActive({
          eth: true,
          busd: false,
          bnb: false,
          usdt: false,
        });
        break;
      case 1:
        setActive({
          eth: false,
          busd: false,
          bnb: false,
          usdt: true,
        });
        break;
      case 2:
        setActive({
          eth: false,
          busd: true,
          bnb: false,
          usdt: false,
        });
        break;
      case 3:
        setActive({
          eth: false,
          busd: false,
          bnb: true,
          usdt: false,
        });
        break;
    }
  };

  const UsdtBool = useMemo(() => {
    return Number(usdtApprove) > Number(ethers.utils.parseUnits(price));
  }, [price, usdtApprove]);

  const BusdBool = useMemo(() => {
    return Number(busdApprove) > Number(ethers.utils.parseUnits(price));
  }, [price, busdApprove]);

  const BnbBool = useMemo(() => {
    return Number(bnbApprove) > Number(ethers.utils.parseUnits(price));
  }, [price, bnbApprove]);

  return (
    <form className="flex flex-col justify-between h-full px-8">
      <FormInput
        id="Price"
        value={price}
        onChange={(e: any) => {
          setP(String(ethers.utils.parseUnits(e.currentTarget.value.toString(), "ether")));
          setPrice(e.currentTarget.value);
        }}
        label="Enter Price"
        type="number"
        required={true}
      />
      {loading && <Loader setLoading={setLoading} />}
      <div className="flex flex-row space-x-5 overflow-scroll scrollbar-hide max-w-xs md:max-w-sm">
        <div
          onClick={() => select(0)}
          className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
          ${active.eth && "bg-blue-500/50"}`}
        >
          <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
            <Image
              className="mx-2"
              src="/eth.png"
              alt="eth"
              width={50}
              height={50}
            />
          </div>
          <div>ETH</div>
        </div>
        {UsdtBool ? (
          <div
            onClick={() => select(1)}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
              ${active.usdt && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/usdt.png"
                alt="usdt"
                width={50}
                height={50}
              />
            </div>
            <div>USDT</div>
          </div>
        ) : (
          <div
            onClick={() => {
              setLoading(true);
              modalOptions(false);
              select(1);
              approveUsdt?.();
            }}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
            ${active.usdt && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/usdt.png"
                alt="usdt"
                width={50}
                height={50}
              />
            </div>
            <div className="whitespace-nowrap">Enable USDT</div>
          </div>
        )}

        {BusdBool ? (
          <div
            onClick={() => select(2)}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
          ${active.busd && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/busd.png"
                alt="busd"
                width={50}
                height={50}
              />
            </div>
            <div>BUSD</div>
          </div>
        ) : (
          <div
            onClick={() => {
              setLoading(true);
              modalOptions(false);
              select(2);
              approveBusd?.();
            }}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
          ${active.busd && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/busd.png"
                alt="busd"
                width={50}
                height={50}
              />
            </div>
            <div className="whitespace-nowrap">Enable BUSD</div>
          </div>
        )}

        {BnbBool ? (
          <div
            onClick={() => select(3)}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
          ${active.bnb && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/bnb.png"
                alt="bnb"
                width={50}
                height={50}
              />
            </div>
            <div>BNB</div>
          </div>
        ) : (
          <div
            onClick={() => {
              setLoading(true);
              modalOptions(false);
              select(3);
              approveBnb?.();
            }}
            className={`flex flex-row items-center space-x-2 border border-blue-400/20 cursor-pointer px-2 py-3 w-fit rounded-2xl
          ${active.bnb && "bg-blue-500/50"}`}
          >
            <div className="rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <Image
                className="mx-2"
                src="/bnb.png"
                alt="bnb"
                width={50}
                height={50}
              />
            </div>
            <div className="whitespace-nowrap">Enable BNB</div>
          </div>
        )}
      </div>
    </form>
  );
};

export default OfferForm;

import useBid from "@/hooks/bids/useBid";
import useCancelBid from "@/hooks/bids/useCancelBid";
import useCompleteBid from "@/hooks/bids/useCompleteBid";
import { BanknotesIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import truncateEthAddress from "truncate-eth-address";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import Loader from "../Html/Loader";

interface OfferProps {
  bidder: string;
  timestamp: string | number;
  tokenId: string | number;
  address?: string;
  value: string | number;
}
const Offers = ({
  address,
  nftId,
}: {
  address: string;
  nftId: string | number;
}) => {
  const OfferCard: React.FC<{ offer: any[]; colAddress: string }> = ({
    offer,
    colAddress,
  }) => {
    const { address } = useAccount();
    const { chain } = useNetwork();

    const [count, setCount] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const router = useRouter();
    const [isBidder, setIsBidder] = useState(false);
    const [loading, setLoading] = useState(false);

    const { callCancelBid, data: cancelData } = useCancelBid(
      colAddress,
      parseInt(offer[0]._hex)
    );
    const { callCompleteBid, data: completeData } = useCompleteBid(
      colAddress,
      parseInt(offer[0]._hex),
      offer[2],
      offer[1]._hex
    );

    // const completeOffer = useCallback(async () => {
    //   const response = await fetch("POST", "/api/activity", {
    //     nftId,
    //     collectionAddress: colAddress,
    //     activityType: "PlaceBid",
    //     from: address,
    //     fromAddress: address,
    //     to: "",
    //     toAddress: "",
    //     time: "0",
    //     price: Number(ethers.utils.formatUnits(price)),
    //   });
    //   console.log(response);
    // }, [nftId, colAddress, address, price]);

    // const cancelOffer = useCallback(async () => {
    //   const response = await fetch("POST", "/api/activity", {
    //     nftId,
    //     collectionAddress: colAddress,
    //     activityType: "PlaceBid",
    //     from: address,
    //     fromAddress: address,
    //     to: "",
    //     toAddress: "",
    //     time: "0",
    //     price: Number(ethers.utils.formatUnits(price)),
    //   });
    //   console.log(response);
    // }, [nftId, colAddress, address, price]);

    useWaitForTransaction({
      confirmations: 2,
      hash: completeData?.hash,
      chainId: chain?.id,
      onSettled(data, error) {
        if (data) {
          const run = async () => {
            setLoading(false);
            toast.success("Accepted Bid Successfuly");
            //await recordAccept();
            setTimeout(() => router.push(`/user/${address}`), 2000);
          };
          (async () => await run())();
        } else {
          console.log(error);
          setLoading(false);
          toast.error("error Accepting Bid");
        }
      },
    });

    useWaitForTransaction({
      confirmations: 2,
      hash: cancelData?.hash,
      chainId: chain?.id,
      onSettled(data, error) {
        if (data) {
          const run = async () => {
            setLoading(false);
            toast.success("Cancelled Bid Successfuly");
            //await recordCancel();
            setTimeout(() => router.reload(), 2000);
          };
          (async () => await run())();
        } else {
          console.log(error);
          setLoading(false);
          toast.error("error Cancelling Bid");
        }
      },
    });

    useEffect(() => {
      if (address) {
        if (offer[2] === address) setIsBidder(true);
        else setIsBidder(false);
      }
    }, [address, offer]);

    var countDown = offer[3] * 1000;

    var interval = setInterval(() => {
      var now = new Date().getTime();

      var distance = countDown - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCount({
        days,
        hours,
        minutes,
        seconds,
      });

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(interval);
        console.log("expired");
        setCount({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return (
      <>
        <div className="flex w-full overflow-auto scrollbar-hide items-center border-b border-b-black dark:border-b-white pb-1 justify-between dark:text-[#b5b5b5]">
          <div className="flex flex-row space-x-4 lg:space-x-8 items-center">
            <div>
              <Image
                className="lg:w-10 w-9 ml-1 cursor-pointer rounded-full ring-1 p-1 ring-black dark:ring-white"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${"0xgray"}`}
                width={50}
                height={50}
                alt="data-image"
              />
            </div>
            <div className="">
              <div className="whitespace-nowrap">
                Bid by{" "}
                <Link
                  href="/"
                  target="_blank"
                  className="font-bold hover:underline text-black dark:text-gray-300"
                >
                  {truncateEthAddress(offer[2])}
                </Link>
              </div>
            </div>
            <div className="text-black text-xl dark:text-gray-300 items-center whitespace-nowrap">
              Expiration:{" "}
              <span className="text-red-500 font-semibold whitespace-nowrap">
                {count.days}:{count.hours}:{count.minutes}:{count.seconds}
              </span>
            </div>
          </div>
          <>
            {isBidder ? (
              <button
                onClick={() => {
                  callCancelBid?.();
                  setLoading(true);
                }}
                disabled={!callCancelBid}
                className="flex flex-row border group rounded-full w-fit items-center border-yellow-400 
                disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                dark:border-yellow-400 px-3 py-1 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
              >
                <ShoppingCartIcon className="w-4 mr-1 group-hover:fill-white fill-yellow-400" />{" "}
                <span className="dark:text-neutral-500 text-black text-sm  text-center whitespace-nowrap">
                  Cancel Bid
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  callCompleteBid?.();
                  setLoading(true);
                }}
                disabled={!callCompleteBid}
                className="flex flex-row border rounded-full w-fit border-yellow-400 items-center dark:border-yellow-400
                disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none px-3 py-1 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
              >
                <BanknotesIcon className="w-4 group-hover:fill-white mr-1 items-center fill-yellow-400" />{" "}
                <span className="dark:text-neutral-500 text-black text-sm  text-center whitespace-nowrap">
                  Accept Offer
                </span>
              </button>
            )}
          </>

          <div className="flex flex-col">
            <div className="text-lg lg:text-xl font-semibold whitespace-nowrap">
              {parseInt(offer[1]._hex) / 1e18} ETH
            </div>
            <div className="whitespace-nowrap text-sm lg:text-base">
              3.12 USD
            </div>
          </div>
        </div>
        {loading ? <Loader setLoading={setLoading} /> : null}
      </>
    );
  };

  const { bids } = useBid(address, nftId);

  return (
    <div className="w-full">
      {/*@ts-ignore */}
      {bids?.map((bid: any, index: number) => (
        <OfferCard colAddress={address} key={index} offer={bid} />
      ))}
    </div>
  );
};

export default Offers;

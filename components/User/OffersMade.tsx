import useBid from "@/hooks/bids/useBid";
import useCancelBid from "@/hooks/bids/useCancelBid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
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
const OffersMade = ({ Data }: { Data: any }) => {

  const OfferCard: React.FC<{ offer: any; colAddress: string }> = ({
    offer,
    colAddress,
  }) => {
    const { chain } = useNetwork();

    const [count, setCount] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { callCancelBid, data: cancelData } = useCancelBid(
      colAddress,
      parseInt(offer[0]._hex)
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
                className="lg:w-10 w-9 mx-5 lg:mx-0 ml-1 cursor-pointer rounded-full ring-1 p-1 ring-black dark:ring-white"
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
            <button
              onClick={() => {
                callCancelBid?.();
                setLoading(true);
              }}
              disabled={!callCancelBid}
              className="flex flex-row border group rounded-full w-fit items-center border-yellow-400
                disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                dark:border-yellow-400 px-3 py-1 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56] mx-2 lg:mx-0"
            >
              <ShoppingCartIcon className="w-4 mr-1 group-hover:fill-white fill-yellow-400" />{" "}
              <span className="dark:text-neutral-500 text-black text-sm  text-center whitespace-nowrap">
                Cancel Bid
              </span>
            </button>
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

  const collection = Data.contract;

  const OfferData: React.FC<{ data: any }> = ({ data }) => {
   const { bids: bid } = useBid(collection, parseInt(data[0]._hex));

    //@ts-ignore

    return (
      <div>
        {data[2] === "0x0000000000000000000000000000000000000000" ? (
          <div></div>
        ) : (
          <OfferCard colAddress={collection} offer={bid} />
        )}
      </div>
    );
  };

  return (
    <div>
      {Data?.data?.map((data: any, index: number) => (
        <div key={index} className="w-full">
          {/*@ts-ignore */}
          <OfferData data={data} />
        </div>
      ))}
    </div>
  );
};

export default OffersMade;

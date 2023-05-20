import { ModalProps } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import PreviewCard from "../Cards/PreviewCard";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import BidForm from "../Forms/BidForm";
import usePlaceBid from "@/hooks/bids/usePlaceBid";
import fetch from "@/helpers/fetch";
import { ethers } from "ethers";
import Weth from "./Weth";
import useConvert from "@/hooks/useConvert";
import useBalance from "@/hooks/useBalance";

export default function BidModal({
  isOpen,
  setIsOpen,
  colAddress,
  nftId,
  fileUrl,
  previewData,
  buyPrice,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [weth, setWethP] = useState("");
  const [isWeth, setWeth] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [approve, setApprove] = useState(false);
  const [shouldConvert, setShouldConvert] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  const addOffer = useCallback(async () => {
    const response = await fetch("POST", "/api/activity", {
      tokenId: nftId,
      collectionAddress: colAddress,
      activityType: "PlaceBid",
      from: address,
      fromAddress: address,
      to: "",
      toAddress: "",
      time: "0",
      price: Number(ethers.utils.formatUnits(price)),
    });
    console.log(response);
  }, [nftId, colAddress, address, price]);

  const { data, callPlaceBid } = usePlaceBid(colAddress!, nftId!, price, date!);

  const { balance, wethApprove, wethAwData, allowance } = useBalance();

  useWaitForTransaction({
    confirmations: 2,
    hash: wethAwData?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        const run = async () => {
          setLoading(false);
          toast.success("Weth Approved Successfuly");
          setApprove(true);
        };
        (async () => await run())();
      } else {
        console.log("error");
        setLoading(false);
        setIsOpen(false);
        toast.error("error approving weth");
      }
    },
  });

  useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        const run = async () => {
          setLoading(false);
          setIsOpen(false);
          toast.success("Bid Placed successfuly");
          await addOffer();
          setTimeout(() => router.push(`/user/${address}`), 5000);
        };
        (async () => await run())();
      } else {
        console.log("error");
        setLoading(false);
        setIsOpen(false);
        toast.error("error minting NFT");
      }
    },
  });

  const callMint = async () => {
    setIsOpen(false);
    setLoading(true);
    await callPlaceBid?.();
  };

  const { data: wethData, convert } = useConvert(weth);

  useWaitForTransaction({
    confirmations: 2,
    hash: wethData?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        setIsOpen(true);
        toast.success("Converted successfuly");
        setWeth(true);
      } else {
        console.log("error");
        setLoading(false);
        setIsOpen(false);
        toast.error("error minting NFT");
      }
    },
  });

  useEffect(() => {
    if (address) {
      if (parseInt(balance?._hex!) / 1e18 > 0) {
        setWeth(false);
      } else {
        setWeth(true);
      }
    }
  }, [address, balance]);

  useEffect(() => {
    if (address) {
      if (parseInt(balance?._hex!) / 1e18 > Number(price) / 1e18) {
        setShouldConvert(false);
      } else {
        setShouldConvert(true);
      }
    }
  }, [address, balance, price]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#092940] p-6 text-left align-middle relative shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white dark:text-neutral-500 ext-xl font-bold"
                  >
                    Bid Item
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div>
                      <PreviewCard
                        price={Number(
                          ethers?.utils?.formatEther(buyPrice! ?? "0")
                        )}
                        image={fileUrl}
                        buttonTitle="Bid Now"
                      />
                    </div>

                    <div className="h-full">
                      {isWeth ? (
                        <Weth price={weth} setPrice={setWethP} />
                      ) : (
                        <BidForm
                          setShouldConvert={setShouldConvert}
                          shouldConvert={shouldConvert}
                          date={date!}
                          setDate={setDate}
                          modalOptions={setIsOpen}
                          setP={setPrice}
                        />
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setWeth(!isWeth);
                        setPrice("0");
                        setWethP("0");
                      }}
                      className="underline absolute bottom-5 right-6 lg:bottom-14 lg:right-14 cursor-pointer hover:decoration-sky-600 font-semibold"
                    >
                      {isWeth ? "Bid" : "Convert"}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    {isWeth ? (
                      <button
                        disabled={!convert}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                      disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                    from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                        onClick={() => convert?.()}
                      >
                        Convert
                      </button>
                    ) : (
                      <>
                        {parseInt(allowance?._hex!) / 1e18 >
                        parseInt(price) / 1e18 ? (
                          <button
                            disabled={!callPlaceBid}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                      disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                    from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                            onClick={callMint}
                          >
                            Place Bid
                          </button>
                        ) : (
                          <button
                            disabled={!wethApprove}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                      disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                    from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                            onClick={() =>  {wethApprove?.(); setLoading(true)}}
                          >
                            Approve WETH
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {loading ? <Loader setLoading={setLoading} /> : null}
    </>
  );
}

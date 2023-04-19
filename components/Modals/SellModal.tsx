import useCreate from "@/hooks/nfts/useCreate";
import { ModalProps } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import PreviewCard from "../Cards/PreviewCard";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import { useAccount, useWaitForTransaction } from "wagmi";
import SellForm from "../Forms/SellForm";
import useCreateSell from "@/hooks/sells/useCreateSell";
import useApprove from "@/hooks/useApprove";
import { MarketContext } from "@/context/marketplaceContext";
import fetch from "@/helpers/fetch";

export default function SellModal({
  isOpen,
  setIsOpen,
  fileUrl,
  previewData,
  colAddress,
  nftId,
  price,
  payToken,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [payT, setPayT] = useState("");
  const [sPrice, setSPrice] = useState("");

  const { write, data } = useCreate(fileUrl!);

  const { collAddress } = MarketContext();

  const isOnSale = false;
  const isAuction = false;

  const { callCreate, data: sellData } = useCreateSell(
    colAddress!,
    nftId!,
    payT!,
    sPrice!
  );

  const { address } = useAccount();
  const { isApproved, callApprove, data: apprData } = useApprove(collAddress!);

  const router = useRouter();

  const addSell = useCallback(async () => {
    const response = await fetch("POST", "/api/update-nft", {
      nftId: 1,
      collectionAddress: "",
      category: "",
      isAuctioned: false,
      isOffered: false,
      latestBid: 0,
      latestOffer: 0,
      auctionTimer: 0,
      likes: 0,
      currentValue: 0,
      image: "",
    });
    console.log(response);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
    chainId: 5,
    onSettled(data, error) {
      if (data) {
        setLoading(false);
        setIsOpen(true);
        toast.success("Sell Created successfuly");
        router.push(`/user/${address}`);
      } else {
        console.log(error);
        setLoading(false);
        toast.error("error Listing for sell");
      }
    },
  });

  useWaitForTransaction({
    confirmations: 2,
    hash: apprData?.hash,
    chainId: 5,
    onSettled(data, error) {
      if (data) {
        setLoading(false);
        setIsOpen(true);
        toast.success("NFT Approved successfully");
      } else {
        console.log(error);
        setLoading(false);
        toast.error("error Approving NFT");
      }
    },
  });

  const callMint = async () => {
    setIsOpen(false);
    setLoading(true);
    await callCreate?.();
  };

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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#092940] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white dark:text-neutral-500 ext-xl font-bold"
                  >
                    Sell Item
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div>
                      <PreviewCard buttonTitle="Sell Now" />
                    </div>

                    <div className="h-full">
                      <SellForm
                        setToken={setPayT}
                        setP={setSPrice}
                        modalOptions={setIsOpen}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    {isApproved ? (
                      <button
                        disabled={!callCreate}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                        disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                                         py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                                      from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                        onClick={callMint}
                      >
                        Sell NFT
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                                    from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                        onClick={() => {
                          setLoading(true);
                          callApprove?.();
                        }}
                      >
                        Approve To Sell
                      </button>
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

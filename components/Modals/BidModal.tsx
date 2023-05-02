import { ModalProps } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import PreviewCard from "../Cards/PreviewCard";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import BidForm from "../Forms/BidForm";
import usePlaceBid from "@/hooks/bids/usePlaceBid";
import fetch from "@/helpers/fetch";
import { ethers } from "ethers";

export default function BidModal({
  isOpen,
  setIsOpen,
  colAddress,
  nftId,
  fileUrl,
  previewData,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");

  const { address } = useAccount();
  const { chain } = useNetwork();

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  const addOffer = useCallback(async () => {
    const response = await fetch("POST", "/api/activity", {
      nftId,
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

  const { data, callPlaceBid } = usePlaceBid(colAddress!, nftId!, price);

  const waitForTransaction = useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        const run = async () => {
          setLoading(false);
          setIsOpen(false);
          toast.success("Bought successfuly");
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
  const { isSuccess, status } = waitForTransaction;

  const callMint = async () => {
    setIsOpen(false);
    setLoading(true);
    await callPlaceBid?.();

    if (isSuccess && status === "success") {
      setLoading(false);
      toast.success("NFT minted successfuly");
      router.push(`/user/${address}`);
    }
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
                    Bid Item
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div>
                      <PreviewCard buttonTitle="Bid Now" />
                    </div>

                    <div className="h-full">
                      <BidForm modalOptions={setIsOpen} setP={setPrice} />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                    from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                      onClick={callMint}
                    >
                      Place Bid
                    </button>
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

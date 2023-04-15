import useCreate from "@/hooks/nfts/useCreate";
import { ModalProps } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import PreviewCard from "../Cards/PreviewCard";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import { useAccount, useWaitForTransaction } from "wagmi";
import AuctionForm from "../Forms/AuctionForm";
import useBuy from "@/hooks/buys/useBuy";

export default function BuyModal({
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
  const [payT, setPayT] = useState('')
  const [sPrice, setSPrice] = useState('')

  const { write, data } = useCreate(fileUrl!);

  const isOnSale = false;
  const isAuction = false;

  const { callBuy, data: sellData } = useBuy(
    colAddress!,
    nftId!,
    payT!,
    sPrice!
  );

  const { address } = useAccount();

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const waitForTransaction = useWaitForTransaction({
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
        toast.error("error Listing for cell");
      }
    },
  });
  const { isSuccess, status } = waitForTransaction;

  const callMint = async () => {
    setIsOpen(false);
    setLoading(true);
    await callBuy?.();
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 dark:bg-[#092940] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white dark:text-neutral-500 ext-xl font-bold"
                  >
                    Auction Item
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div>
                      <PreviewCard buttonTitle="Sell Now" />
                    </div>

                    <div className="h-full">
                      <AuctionForm setToken={setPayT} setP={setSPrice} modalOptions={setIsOpen} />
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
                      Buy NFT
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

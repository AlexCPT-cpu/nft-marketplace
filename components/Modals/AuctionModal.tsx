import { ModalProps } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import PreviewCard from "../Cards/PreviewCard";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import { useAccount, useWaitForTransaction } from "wagmi";
import AuctionForm from "../Forms/AuctionForm";
import useApprove from "@/hooks/useApprove";
import { MarketContext } from "@/context/marketplaceContext";
import DatePicker from "../Html/Calender";
import useCreateAuction from "@/hooks/auctions/useCreateAuction";

export default function AuctionModal({
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
  const [minBid, setMinBid] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [error, setError] = useState(false);
  const { collAddress } = MarketContext();

  const { callCreateAuction, data } = useCreateAuction(
    collAddress!,
    nftId!,
    payT!,
    sPrice!,
    minBid,
    new Date(startDate!)?.getTime(),
    new Date(endDate!)?.getTime()
  );

  const { address } = useAccount();

  const router = useRouter();

  const { isApproved, callApprove, data: apprData } = useApprove(collAddress!);

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
        toast.error("error Listing for cell");
      }
    },
  });

  const callMint = async () => {
    setIsOpen(false);
    setLoading(true);
    await callCreateAuction?.();
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
                    Auction Item
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div>
                      <PreviewCard buttonTitle="Sell Now" />
                    </div>

                    <div className="h-full">
                      <AuctionForm
                        setToken={setPayT}
                        setP={setSPrice}
                        modalOptions={setIsOpen}
                        setMinBid={setMinBid}
                        minBid={minBid}
                      />
                      <div className="flex justify-center items-center flex-col lg:flex-row">
                        <DatePicker
                          error={error}
                          setError={setError}
                          title="Start Date"
                          onChange={setStartDate}
                          value={startDate!}
                        />
                        <DatePicker
                          error={error}
                          setError={setError}
                          start={startDate}
                          end={endDate}
                          title="End Date"
                          onChange={setEndDate}
                          value={endDate!}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    {isApproved ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                                         py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                                         disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
                                      from-[#feb019] via-[#e39601] to-[#f59292] focus-visible:ring-2"
                        onClick={callMint}
                        disabled={!callCreateAuction}
                      >
                        Auction NFT
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-[#feb019] px-4
                                       py-2 text-sm font-medium text-[#feb019]focus:outline-none hover:bg-gradient-to-r
                                       disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-none disabled:border-none
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

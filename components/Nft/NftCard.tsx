import { NftData, NftProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import History from "./History";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import axios from "axios";
import SellModal from "../Modals/SellModal";
import toast from "react-hot-toast";
import BidModal from "../Modals/BidModal";
import useCancel from "@/hooks/cancels/useCancel";
import Loader from "../Html/Loader";
import BuyModal from "../Modals/BuyModal";
import AuctionModal from "../Modals/AuctionModal";
import MakeOfferModal from "../Modals/MakeOfferModal";
import { MarketContext } from "@/context/marketplaceContext";

const NftCard = ({
  image,
  name,
  timer,
  likes,
  CollectionName,
  price,
  nftId,
  nftAddress,
  fullData,
  creator,
  owner,
}: NftProps) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBidModal, setBidModal] = useState(false);
  const [isBuyModal, setBuyModal] = useState(false);
  const [isAuctionModal, setAuctionModal] = useState(false);
  const [isMakeOfferModal, setIsMakeOfferModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isSell, setIsSell] = useState(false);

  const { collAddress } = MarketContext()

  const { chain } = useNetwork();

  const { address } = useAccount();

  const { callCancel, data } = useCancel(
    collAddress as string,
    fullData[0]?.tokenId
  );

  const waitForTransaction = useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        toast.success("NFT minted successfuly");
        setTimeout(() => window.location.reload(), 3000);
      } else {
        console.log("error");
        setLoading(false);
        toast.error("error minting NFT");
      }
    },
  });
  const { isSuccess, status } = waitForTransaction;

  useEffect(() => {
    const getNFTs = async () => {
      const response = await axios.post("/api/nfts", {
        address: address,
      });
      return response.data;
    };
    if (address) {
      getNFTs().then((data) => {
        data.ownedNfts.map((item: NftData) => {
          if (item.tokenId === fullData[0]?.tokenId) {
            setIsOwner(true);
          }
        });
      });
    }
  }, [address, nftId, nftAddress, fullData]);

  return (
    <div className="border dark:bg-[#041824] border-black dark:border-[#092940] p-4 rounded-md hover:shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between w-full">
        <div className="relative lg:mr-3 flex justify-center">
          <Image
            className="object-cover w-full h-[300px] lg:w-[400px] lg:h-[400px] rounded-md mb-5 mx-auto flex"
            src={image!}
            width={200}
            height={200}
            alt="card image"
          />
        </div>

        <div className="flex flex-col text-left space-y-2 dark:text-gray-500">
          <div className="font-bold text-2xl">{name}</div>
          <div className="flex flex-row items-center">
            <Link className="flex flex-row items-center" href="/">
              {CollectionName}
              <span>
                {" "}
                <CheckCircleIcon className="w-5 fill-green-600 ml-1" />{" "}
              </span>
            </Link>
          </div>
          {loading && <Loader setLoading={setLoading} />}
          <div className="flex flex-col my-3 py-2">
            <div className="text-xl font-">Current Price</div>
            <div className="flex flex-row">
              <CurrencyDollarIcon className="w-6 mr-2 dark:text-white" />{" "}
              <span className="text-green-600 font-semibold text-2xl">
                {price} BTC ≈$26.69
              </span>
            </div>
          </div>
          {isAuction ? (
            <div className="text-xl pb-3">
              Auction ending in
              <div className="text-3xl text-red-500">{"7:25:3"}</div>
            </div>
          ) : null}
          <SellModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            fileUrl={""}
          />
          <BidModal isOpen={isBidModal} setIsOpen={setBidModal} fileUrl={""} />

          <BuyModal isOpen={isBuyModal} setIsOpen={setBuyModal} fileUrl={""} />

          <MakeOfferModal
            isOpen={isMakeOfferModal}
            setIsOpen={setAuctionModal}
            fileUrl={""}
          />

          <AuctionModal
            isOpen={isAuctionModal}
            setIsOpen={setAuctionModal}
            fileUrl={""}
          />

          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
            {isOwner && isSell === false ? (
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="flex flex-row border rounded-full w-fit items-center border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
              >
                <BanknotesIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                <span className="dark:text-neutral-500 text-black whitespace-nowrap text-lg ml-3">
                  Sell NFT
                </span>
              </div>
            ) : (
              <>
                {isSell ? (
                  <div
                    onClick={() => {
                      setBuyModal(true);
                    }}
                    className="flex flex-row border rounded-full w-fit border-yellow-400 items-center dark:border-yellow-400 px-8 py-3 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <BanknotesIcon className="w-6 group-hover:fill-white items-center fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg ml-3 text-center whitespace-nowrap">
                      Buy NFT
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setIsMakeOfferModal(true);
                    }}
                    className="flex flex-row border rounded-full w-fit border-yellow-400 items-center dark:border-yellow-400 px-8 py-3 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <BanknotesIcon className="w-6 group-hover:fill-white items-center fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg ml-3 text-center whitespace-nowrap">
                      Make Offer
                    </span>
                  </div>
                )}
              </>
            )}

            {isOwner ? (
              <>
                {isSell ? (
                  <div
                    onClick={() => {
                      setLoading(true);
                      callCancel?.();
                    }}
                    className="flex flex-row border group rounded-full w-fit items-center border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg ml-3 text-center whitespace-nowrap">
                      Cancel Sell
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setAuctionModal(true);
                    }}
                    className="flex flex-row border group rounded-full w-fit items-center border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg ml-3 text-center whitespace-nowrap">
                      Auction NFT
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {isAuction ? (
                  <div
                    onClick={() => {
                      setBidModal(true);
                    }}
                    className="flex flex-row border group items-center rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg ml-3 whitespace-nowrap">
                      Place Bid
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4 mr-0 lg:mr-60 lg:justify-center justify-start my-5 lg:mt-0 items-center">
          <div className="flex items-center justify-start lg:justify-center mr-auto flex-row">
            <div className="ring-1 ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="w-10 cursor-pointer rounded-full"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Creator</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link className="whitespace-nowrap" href="/">
                  {creator}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start mr-auto lg:justify-center flex-row">
            <div className="ring-1 ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="w-10 cursor-pointer rounded-full"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Owner</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link className="whitespace-nowrap" href="/">
                  @{owner}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <History />
    </div>
  );
};

NftCard.defaultProps = {
  image: "/poke.jpg",
  name: "Holey Aliens #1",
  timer: "21:50:23",
  CollectionName: "Holey Aliens",
  likes: 13,
  price: 0.083,
  creator: "Holy Aliens",
  owner: "Holy Aliens",
};

export default NftCard;

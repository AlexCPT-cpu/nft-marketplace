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
import getCollectionName from "@/helpers/getCollectionName";
import truncateEthAddress from "truncate-eth-address";
import getOwner from "@/helpers/getOwner";
import { useRouter } from "next/router";
import isListed from "@/helpers/isListed";
import getNftDetails from "@/helpers/getNftDetails";
import fetch from "@/helpers/fetch";

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
  const [loading, setLoading] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [listedP, setListedP] = useState("0");

  const [nftData, setNftData] = useState<any>();


  useEffect(() => {
    const getNft = async () => {
      if (nftAddress && nftId) {
        const res = await fetch("POST", "/api/getNfts", {
          collectionAddress: nftAddress,
          nftId,
        });
        setNftData(res?.data);
      }
    };

    getNft();
  }, [nftAddress, nftId]);


  const [Creator, setCreator] = useState("");
  const [Own, setOwn] = useState("");
  const router = useRouter();

  const { chain } = useNetwork();

  const { address } = useAccount();

  const { callCancel, data } = useCancel(
    nftAddress as string,
    fullData[0]?.tokenId
  );

  useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
    chainId: chain?.id,
    onSuccess(data) {
      if (data) {
        setLoading(false);
        toast.success("Listing cancelled successfuly");
        setTimeout(() => router.reload(), 3000);
      } else {
        console.log("error");
        setLoading(false);
        toast.error("error Cancelling NFT");
      }
    },
  });

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
            //setIsOwner(true);
            console.log("tokenId comparison");
          }
        });
      });
    }
  }, [address, nftId, nftAddress, fullData]);

  useEffect(() => {
    const getNft = async () => {
      const { data }: any = await getCollectionName(nftAddress!);
      const { data: listed } = await isListed(nftAddress!, nftId!);
      const { data: own }: any = await getOwner(nftAddress!, nftId!);
      const { owner } = await getNftDetails(nftAddress!, nftId!);
      setIsOwner(owner === address);
      //@ts-ignore
      if (listed?.seller !== "0x0000000000000000000000000000000000000000") {
        setIsSell(true);
        //@ts-ignore
        setListedP(String(parseInt(listed[1]._hex)));
      }
      setCreator(data?.creator);
      setOwn(own);
    };

    getNft();
  }, [nftAddress, nftId, address]);

  return (
    <div className="border dark:bg-[#041824] border-black dark:border-[#092940] p-4 rounded-md hover:shadow-xl">
      <div className="flex flex-col lg:items-center lg:flex-row lg:justify-between w-full">
        <div className="lg:mr-3 flex w-full justify-items-start items-start">
          <Image
            className="xl:w-[400px] xl:h-[400px] w-[400px] h-[320px] rounded-lg mb-5  flex object-cover"
            src={image!}
            width={200}
            height={200}
            alt="card image"
          />
        </div>

        <div className="flex flex-col w-full text-left whitespace-nowrap space-y-2 dark:text-gray-500">
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
            <div className="text-xl font-">
              {nftData?.isSell ? "Current Price" : "Current Value"}
            </div>
            <div className="flex flex-row">
              <CurrencyDollarIcon className="w-6 mr-2 dark:text-white" />{" "}
              <span className="text-green-600 font-semibold text-2xl">
                {nftData?.isSell
                  ? nftData?.listedPrice?.toFixed(4)
                  : nftData?.currentValue?.toFixed(4)}{" "}
                ETH
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
            fileUrl={image}
            nftId={nftId}
            colAddress={nftAddress}
          />
          <BidModal
            isOpen={isBidModal}
            setIsOpen={setBidModal}
            fileUrl={image}
            nftId={nftId}
            colAddress={nftAddress}
            buyPrice={listedP}
          />

          <BuyModal
            isOpen={isBuyModal}
            setIsOpen={setBuyModal}
            fileUrl={image}
            nftId={nftId}
            colAddress={nftAddress}
            buyPrice={listedP}
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
                <span className="dark:text-neutral-500 text-black whitespace-nowrap text-lg ">
                  Sell NFT
                </span>
              </div>
            ) : (
              <>
                {isSell && Own !== address ? (
                  <div
                    onClick={() => {
                      setBuyModal(true);
                    }}
                    className="flex flex-row border rounded-full w-fit border-yellow-400 items-center dark:border-yellow-400 px-8 py-3 cursor-pointer group hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <BanknotesIcon className="w-6 group-hover:fill-white items-center fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg  text-center whitespace-nowrap">
                      Buy NFT
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}

            {isOwner ? (
              <>
                {isSell && Own === address ? (
                  <div
                    onClick={() => {
                      setLoading(true);
                      callCancel?.();
                    }}
                    className="flex flex-row border group rounded-full w-fit items-center border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg  text-center whitespace-nowrap">
                      Cancel Sell
                    </span>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {isSell ? (
                  <div
                    onClick={() => {
                      setBidModal(true);
                    }}
                    className="flex flex-row border group items-center rounded-full w-fit border-yellow-400 dark:border-yellow-400 px-8 py-3 cursor-pointer hover:bg-gradient-to-r transition delay-100 from-[#feb019] to-[#ef7e56]"
                  >
                    <ShoppingCartIcon className="w-6 group-hover:fill-white fill-yellow-400" />{" "}
                    <span className="dark:text-neutral-500 text-black text-lg whitespace-nowrap">
                      Place Bid
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full space-y-4 mr-0 lg:justify-center justify-start my-5 lg:mt-0 items-center">
          <div className="flex items-center w-full justify-start lg:justify-center flex-row">
            <div className="ring-1 ml-2 flex items-center ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="lg:w-12 w-10 cursor-pointer rounded-full object-cover"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${creator}`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Creator</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link className="whitespace-nowrap" href="/">
                  {truncateEthAddress(Creator)}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full justify-start lg:justify-center flex-row">
            <div className="ring-1 ml-2 lg:ml-0 flex items-center ring-gray-300 dark:ring-gray-300 bg-slate-500/5 p-1 rounded-full">
              <Image
                className="lg:w-12 w-10 cursor-pointer rounded-full object-cover"
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${Own}`}
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-4 dark:text-gray-300">
              <div>Owner</div>
              <div className="font-bold hover:text-gray-400 dark:hover:text-gray-400 dark:text-gray-500">
                <Link className="whitespace-nowrap" href="/">
                  {truncateEthAddress(Own)}
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

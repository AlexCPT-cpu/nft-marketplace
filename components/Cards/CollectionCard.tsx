import fetch from "@/helpers/fetch";
import { CollectionProps } from "@/types/types";
import { CheckCircleIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CollectionCard = ({
  image,
  name,
  owners,
  background,
  sold,
  items,
  description,
  address
}: CollectionProps) => {

  const [nftL, setNftL] = useState(0)
  const [Owners, setOwners] = useState(0)

  useEffect(() => {
    const getData = async () => {
      if(address) {
        const response = await fetch("POST", '/api/collection', {
          address
        })
        const res = await fetch("POST", '/api/getOwners', {
          address
        })
        setNftL(response?.data?.nfts?.length)
        setOwners(res.data.owners.length)
      }
    }
    getData()
  }, [address])

  return (

    <div className="border border-yellow-400 dark:bg-[#041824] dark:border-yellow-400 p-4 rounded-md max-w-[300px] hover:shadow-xl">
      <div className="flex flex-col items-center space-y-0">
        <div className="relative">
          <Image
            className="object-cover w-full rounded-md mb-5 h-32"
            src={background!}
            width={200}
            height={200}
            alt="card image"
          />
          <Link href={`/collection/${address ?? '1'}`}>
            <Image
              className="object-cover bg-slate-800/30 absolute ring-1 ring-gray-300 w-16 top-12 cursor-pointer left-5 rounded-full mb-5"
              src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
              width={200}
              height={200}
              alt="card image"
            />
          </Link>
          <div className="absolute top-20 cursor-pointer left-16">
            <CheckCircleIcon className="fill-[#629d24] bg-clip-content text-clip rounded-full w-6" />
          </div>
        </div>

        <div className="text-black dark:text-neutral-400 text-lg font-semibold text-left">
          <Link href={`/collection/${address ?? '1'}`}>{name}</Link>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="">
              <p className="text-black dark:text-neutral-400 font-bold">{Owners}</p>
              <p className="text-black dark:text-gray-600 text-sm">Owners</p>
            </div>
            <div>
              <p className="text-black dark:text-neutral-400 font-bold">{nftL}</p>
              <p className="text-black dark:text-gray-600 text-sm">Items</p>
            </div>
            <div>
              <p className="text-black dark:text-neutral-400 font-bold flex flex-row"><CurrencyDollarIcon className="w-5" />&nbsp;{(sold!)/1000}K</p>
              <p className="text-black dark:text-gray-600 text-sm">Sold</p>
            </div>
          </div>

          <div className="text-black dark:text-gray-600 text-sm">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionCard.defaultProps = {
  image: "https://api.dicebear.com/5.x/avataaars/svg?seed=Gracie",
  name: "Hats Eye World",
  owners: 213,
  background: "/bg3.jpg",
  sold: 2500,
  items: 350,
  description:
    "Welcome to Digital Human NFT! I've been mining my brains out to bring you these seeds of the metaverse...",
};

export default CollectionCard;

import React, { useEffect, useState } from "react";
import Input from "../Html/Input";
import TextArea from "../Html/TextArea";
import ImageUpload from "../Html/ImageUpload";
import NftCard from "../Cards/NftCard";
import PreviewCard from "../Cards/PreviewCard";
import Link from "next/link";
import { client } from "@/config/config";
import Factory from "@/config/Factory.json";
import { factory } from "@/config/config";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Loader from "../Html/Loader";

const CreateCard = () => {
  const [product, setProduct] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState();

  const { config: createConfig } = usePrepareContractWrite({
    address: factory,
    abi: Factory,
    functionName: "createNFT",
    args: [fileUrl],
  });

  const { data, write } = useContractWrite({
    ...createConfig,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    onMutate({ args, overrides }: any) {
      console.log("Mutate", { args, overrides });
    },
  });
  const waitForTransaction = useWaitForTransaction({
    confirmations: 2,
    hash: data?.hash,
  });
  const { isFetched, isSuccess, status } = waitForTransaction;

  const Submit = async () => {
    setLoading(true);
    try {
      const added = await client.add(image!, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added?.path}`;

      if (url) {
        const data = await JSON.stringify({
          product,
          desc,
          image: url,
        });

        const addedJS = await client.add(data);
        const urlJS = `https://ipfs.infura.io/ipfs/${addedJS?.path}`;
        const jsonUrl = `ipfs://${addedJS?.path}}`;

        if (jsonUrl) {
          setLoading(false);
          setFileUrl(jsonUrl);
          return jsonUrl;
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
console.log(fileUrl)
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-10">
      <div className="border-[1px] flex flex-col mt-10 border-gray-200 dark:text-neutral-500 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
        <h1 className="text-left font-semibold text-xl border-b border-b-sky-500/30 w-full pb-2">
          Fill Detail
        </h1>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <div className="text-lg">
            Upload Item<sup className="text-red-500 ml-1">*</sup>
          </div>
          <div>
            <ImageUpload onChange={(image) => setImage(image)} />
          </div>

          <div>
            <div className="text-lg mb-5 mt-5">
              Select Method<sup className="text-red-500 ml-1">*</sup>
            </div>
          </div>

          <div>
            <div className="flex flex-row">
              <div>
                <input name="Fix" type="radio" />
                <label className="ml-2" htmlFor="">
                  FixPrice
                </label>
              </div>

              <div className="ml-auto">
                <input name="Fix" type="radio" />
                <label className="ml-2" htmlFor="">
                  Open For Bid
                </label>
              </div>
            </div>
          </div>
          <Input
            id="Product"
            value={product}
            onChange={(e: any) => {
              setProduct(e.currentTarget.value);
            }}
            label="Product"
            type="text"
            title="Product Name"
          />

          <div>
            <div className="text-lg mb-2">
              Choose Collection<sup className="text-red-500 ml-1">*</sup>
            </div>
            <select className="w-full p-3 active:border-yellow-600 bg-transparent border-2 dark:bg-[#041824] dark:border-[#092940] border-gray-200 rounded-md outline-none">
              <option>Abstraction</option>
              <option>Patternlicious</option>
              <option>Sketchify</option>
              <option>Cartoonism</option>
              <option>Virtuland</option>
              <option>Papercut</option>
            </select>
            <div className="mt-3 text-sm">
              This is the collection where your item will Show.
            </div>
          </div>

          <div className="flex flex-row w-full items-center justify-around">
            <Input
              id="Price"
              value={price}
              onChange={(e: any) => {
                setPrice(e.currentTarget.value);
              }}
              label="Price"
              type="text"
              title="$ Price for Item"
            />

            <Input
              id="Number"
              value={number}
              onChange={(e: any) => {
                setNumber(e.currentTarget.value);
              }}
              label="Copies"
              type="text"
              title="Number of copies"
            />
          </div>

          <TextArea
            id="Desc"
            value={desc}
            onChange={(e: any) => {
              setDesc(e.currentTarget.value);
            }}
            label="Set Descripion"
            type="text"
            title="Description"
          />

          <Input
            id="Site"
            value={royalty}
            onChange={(e: any) => {
              setRoyalty(e.currentTarget.value);
            }}
            label="Eg: 10%, 20%, 30%. Maximum is 70%"
            type="text"
            title="Royalty"
          />

          <button
            className="p-2 px-4 mt-5 bg-yellow-500 hover:bg-opacity-75 dark:text-white rounded-lg"
            type="submit"
            onClick={async () => {
              const x = await Submit();
              await write?.();
            }}
          >
            Upload Details
          </button>
        </form>
      </div>
      {loading ? <Loader setLoading={setLoading} /> : null}

      <div className="min-w-[300px] dark:text-neutral-500 space-y-3 max-h-[250px] flex flex-col mt-10 mb-72 lg:mb-2">
        <div className="text-xl font-bold">Preview Item</div>
        <div>
          <PreviewCard />
        </div>
        <div>
          <p>
            <span className="dark:text-neutral-400 mr-2">Note:</span>Minimum
            Service Fee : 1.5%
          </p>
          <p className="mt-4">
            If any help redarding to upload file please contact{" "}
            <Link href="/" className="text-yellow-600">
              Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

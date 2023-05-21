import React, { useCallback, useState } from "react";
import Input from "../Html/Input";
import TextArea from "../Html/TextArea";
import ImageUpload from "../Html/ImageUpload";
import Link from "next/link";
import { client } from "@/config/config";
import Loader from "../Html/Loader";
import CreateModal from "../Modals/CreateModal";
import axios from "axios";

const CreateCard = () => {
  const [product, setProduct] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [preview, setPreview] = useState({});

  const Submit = useCallback(async () => {
    setLoading(true);
    try {
      const added = await client.add(image!, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added?.path}`;

      if (url) {
        const data = await JSON.stringify({
          name: product,
          description: desc,
          image: url,
          title,
        });

        const addedJS = await client.add(data);
        const urlJS = `https://ipfs.infura.io/ipfs/${addedJS?.path}`;
        const jsonUrl = `ipfs://${addedJS?.path}`;

        if (jsonUrl) {
          setLoading(false);
          setFileUrl(jsonUrl);
          const string = urlJS;
          const parsed = string.replace(
            "https://ipfs.infura.io/ipfs/",
            "https://ipfs.io/ipfs/"
          );
          const res = await axios.get(parsed);
          setPreview(res?.data);
          setModalOpen(true);
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }, [desc, image, product, title]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-10">
      <div className="border-[1px] flex flex-col mt-10 border-gray-200 dark:text-neutral-500 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
        <h1 className="text-left font-semibold text-xl border-b border-b-sky-500/30 w-full pb-4">
          Fill Detail
        </h1>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <div className="text-lg py-3">
            Upload Item<sup className="text-red-500 ml-1">*</sup>
          </div>
          <div>
            <ImageUpload onChange={(image: any) => setImage(image)} />
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

          <Input
            id="Product"
            value={title}
            onChange={(e: any) => {
              setTitle(e.currentTarget.value);
            }}
            label="Title"
            type="text"
            title="Enter Title"
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
              await Submit();
            }}
          >
            Upload Details
          </button>
        </form>
      </div>
      {loading ? <Loader setLoading={setLoading} /> : null}
      <CreateModal
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        fileUrl={fileUrl}
        previewData={preview}
      />

      <div className="min-w-[300px] dark:text-neutral-500 space-y-3 max-h-[250px] flex flex-col mt-10 mb-72 lg:mb-2">
        <div className="text-xl font-bold">Preview Item</div>
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

import React, { useCallback, useState } from "react";
import Input from "../Html/Input";
import TextArea from "../Html/TextArea";
import ImageUpload from "../Html/ImageUpload";
import Link from "next/link";
import Loader from "../Html/Loader";
import fetch from "@/helpers/fetch";

const CreateColCard = () => {
  const [product, setProduct] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");

  const Submit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("POST", "/api/updateCol", {
        address,
        product,
        collectionAddress: address,
        instaUsername: instagram,
        twitterUsername: twitter,
        facebookUsername: facebook,
        description: desc,
        website,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [address, desc, twitter, facebook, instagram, website, product]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-10">
      <div className="border-[1px] flex flex-col mt-10 border-gray-200 dark:text-neutral-500 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
        <h1 className="text-left font-semibold text-xl border-b border-b-sky-500/30 w-full pb-4">
          Fill Detail
        </h1>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <Input
            id="Name"
            value={product}
            onChange={(e: any) => {
              setProduct(e.currentTarget.value);
            }}
            label="Collection Name"
            type="text"
            title="Collection Name"
          />

          <Input
            id="Address"
            value={address}
            onChange={(e: any) => {
              setAddress(e.currentTarget.value);
            }}
            label="Collection Address"
            type="text"
            title="Collection Address"
          />

          <div>
            <div className="text-lg mb-2">
              Choose Category<sup className="text-red-500 ml-1">*</sup>
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
            id="Facebook"
            value={facebook}
            onChange={(e: any) => {
              setFacebook(e.currentTarget.value);
            }}
            label="Facebook"
            type="text"
            title="Enter Facebook Username"
          />

          <Input
            id="Twitter"
            value={twitter}
            onChange={(e: any) => {
              setTwitter(e.currentTarget.value);
            }}
            label="Twitter"
            type="text"
            title="Enter Twitter Username"
          />

          <Input
            id="Instagram"
            value={instagram}
            onChange={(e: any) => {
              setInstagram(e.currentTarget.value);
            }}
            label="Instagram"
            type="text"
            title="Enter Instagram Username"
          />

          <Input
            id="Website"
            value={website}
            onChange={(e: any) => {
              setWebsite(e.currentTarget.value);
            }}
            label="Website"
            type="text"
            title="Enter Website"
          />

          <Input
            id="royalty"
            value={royalty}
            onChange={(e: any) => {
              setRoyalty(e.currentTarget.value);
            }}
            label="Eg: 10%, 20%, 30%. Maximum is 70%"
            type="text"
            title="Royalty"
          />

          <div className="text-lg py-3">
            Upload Logo<sup className="text-red-500 ml-1">*</sup>
          </div>
          <div>
            <ImageUpload onChange={(image) => setImage(image)} />
          </div>

          <div className="text-lg py-3">
            Upload Background Image<sup className="text-red-500 ml-1">*</sup>
          </div>
          <div>
            <ImageUpload onChange={(image) => setImage(image)} />
          </div>

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

export default CreateColCard;

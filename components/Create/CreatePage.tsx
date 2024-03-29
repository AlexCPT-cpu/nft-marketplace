import React, { useEffect, useState } from "react";
import Input from "../Html/Input";
import TextArea from "../Html/TextArea";
import ImageUpload from "../Html/ImageUpload";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";
import fetch from "@/helpers/fetch";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const CreatePage: React.FC<{ referralId: string }> = ({ referralId }) => {
//http://localhost:3000/createprofile?referral=natsuo
  const router = useRouter();
  const [name, setName] = useState("");
  // const [facebook, setFaceBook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [userName, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [background, setBackground] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invited, setInvited] = useState(referralId);

  const { address } = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("POST", "/api/createUser", {
        address,
        name,
        userName,
        twitter,
        instagram,
        bio,
        image,
        background,
        invited,
      });
      setIsLoading(false);
      toast.success("User Created Successfully", {
        position: "bottom-center",
      });
      console.log(response);
      router.push(`/user/${address}`);
    } catch (ex) {
      console.log(ex);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setImage(`https://api.dicebear.com/5.x/avataaars/svg?seed=${"jolene"}`);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-10">
      <div className="border-[1px] flex flex-col mt-10 border-gray-200 dark:text-neutral-500 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
        <h1 className="text-left font-semibold text-xl border-b border-b-sky-500/30 w-full pb-2">
          Profile Create
        </h1>
        {isLoading && <Loader setLoading={setIsLoading} />}
        <form onSubmit={submit}>
          <Input
            id="Name"
            value={name}
            onChange={(e: any) => {
              setName(e.currentTarget.value);
            }}
            label="Enter Full Name"
            type="text"
            title="Name"
            required={true}
          />
          <Input
            id="Username"
            value={userName}
            onChange={(e: any) => {
              setUsername(e.currentTarget.value);
            }}
            label="Enter Username"
            type="text"
            title="Username"
            required={true}
          />

          <TextArea
            id="Bio"
            value={bio}
            onChange={(e: any) => {
              setBio(e.currentTarget.value);
            }}
            label="Set Bio Detail"
            type="text"
            title="Bio Detail"
          />

          <Input
            id="Twitter"
            value={twitter}
            onChange={(e: any) => {
              setTwitter(e.currentTarget.value);
            }}
            label="Enter Twitter Username"
            type="text"
            title="Twitter Username"
          />

          <Input
            id="Instagram"
            value={instagram}
            onChange={(e: any) => {
              setInstagram(e.currentTarget.value);
            }}
            label="Enter Instagram Username"
            type="text"
            title="Instagram Username"
          />

          <Input
            id="Referral"
            value={invited}
            onChange={(e: any) => {
              setInvited(e.currentTarget.value);
            }}
            label="Enter Referral Username or Address"
            type="text"
            title="Referral Username or Address"
          />

          <button
            className="p-2 px-8 mt-5 bg-yellow-500 hover:bg-opacity-75 dark:text-white rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="min-w-[300px] dark:text-neutral-500 space-y-3 h-full flex flex-col mt-10">
        <div>
          <div className="text-xl font-bold">Profile Image</div>
          <div>
            <ImageUpload
              value={image}
              disabled={isLoading}
              onChange={(image: any) => setImage(image)}
              label="Change Profile Picture Here"
            />
          </div>
        </div>

        <div className="">
          <div className="text-xl font-bold">Background Image</div>
          <div>
            <ImageUpload
              value={background}
              disabled={isLoading}
              onChange={(image: any) => setBackground(image)}
              label="Change Profile Picture Here"
            />
          </div>
          <div className="">Change Profile Picture Here</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

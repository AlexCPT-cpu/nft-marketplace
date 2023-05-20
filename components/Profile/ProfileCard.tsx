import React, { useCallback, useEffect, useState } from "react";
import Input from "../Html/Input";
import TextArea from "../Html/TextArea";
import ImageUpload from "../Html/ImageUpload";
import fetch from "@/helpers/fetch";
import { useAccount } from "wagmi";
import Loader from "../Html/Loader";
import toast from "react-hot-toast";

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  // const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [background, setBackground] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();

  const submit = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("POST", "/api/updateUser", {
      address,
      name,
      userName,
      twitter,
      instagram,
      bio,
      image,
      background,
    });
    return response;
  }, [address, name, userName, twitter, bio, image, background, instagram]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit()
      .then((response) => {
        if (response?.data) {
          setIsLoading(false);
          toast.success("Account Updated Successfully");
        } else {
          setIsLoading(false);
          toast.error("Error Updating Account");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setImage(`https://api.dicebear.com/5.x/avataaars/svg?seed=${"jolene"}`);
  }, []);

  return (
    <>
      {" "}
      <div className="flex flex-col lg:flex-row lg:justify-between space-x-0 lg:space-x-10">
        <div className="border-[1px] flex flex-col mt-10 border-gray-200 dark:text-neutral-500 dark:bg-[#041824] dark:border-[#092940] p-4 rounded-md w-full">
          <h1 className="text-left font-semibold text-xl border-b border-b-sky-500/30 w-full pb-2">
            Profile Edit
          </h1>

          <form onSubmit={handleSubmit}>
            <Input
              id="Name"
              value={name}
              onChange={(e: any) => {
                setName(e.currentTarget.value);
              }}
              label="Enter Name"
              type="text"
              title="Name"
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
              id="Site"
              value={site}
              onChange={(e: any) => {
                setSite(e.currentTarget.value);
              }}
              label="Your Site"
              type="text"
              title="Enter Your Site"
            />

            <button
              className="p-2 px-8 mt-5 bg-yellow-500 hover:bg-opacity-75 dark:text-white rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex flex-col">
          <div className="min-w-[300px] dark:text-neutral-500 space-y-3 h-full flex flex-col mt-10">
            <div className="text-xl font-bold">Profile Image</div>
            <div>
              <ImageUpload
                value={image}
                disabled={isLoading}
                onChange={(image: any) => setImage(image)}
                label="Change Profile Image Here"
              />
            </div>
            <div>Change Profile Image Here</div>
          </div>
          <div className="min-w-[300px] dark:text-neutral-500 space-y-3 h-full flex flex-col mt-10">
            <div className="text-xl font-bold">Background Image</div>
            <div>
              <ImageUpload
                value={background}
                disabled={isLoading}
                onChange={(image: any) => setBackground(image)}
                label="Change Background Image Here"
              />
            </div>
            <div>Change Background Image Here</div>
          </div>
        </div>
      </div>
      {isLoading && <Loader setLoading={setIsLoading} />}
    </>
  );
};

export default ProfileCard;

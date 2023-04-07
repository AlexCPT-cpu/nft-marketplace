import axios from "axios";
import Image from "next/image";
import { HeroConnectButton } from "../Html/HeroConnectButton";

const Hero = () => {

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center px-6 lg:px-16 mb-8 mt-10">
      <div className="lg:hidden flex justify-center mx-auto text-center items-center">
        <Image
          className="w-[850px] h-[350px] md:h-[450px] md:w-[500px] mb-5 rounded-xl object-cover mx-auto text-center"
          src="/hero.jpg"
          width={200}
          height={200}
          alt="hero"
        />
      </div>
      <div className="space-y-10">
        <div className="text-sm ml-1 md:ml-3 lg:ml-0">
          <button className="p-2 transition bg-gradient-to-r text-white cursor-pointer from-[#feb019] via-[#e39601] to-[#f59292] rounded-sm px-3">
            NFT MARKETPLACE MADE SIMPLER
          </button>
        </div>

        <div className="">
          <h1 className="font-semibold text-5xl text-black dark:text-gray-500 mb-5">
            Create Collect
            <br />
            <span className="bg-clip-text text-transparent bg-[#feb019]">
              Timeless
            </span>{" "}
            Artworks.
          </h1>

          <p className="text-black dark:text-gray-500 text-xl">
            We offer a wide range of non-fungible tokens, including art,
            <br />
            censorship-resistant domain names and other collectibles
          </p>
        </div>

        <div className="text-sm flex flex-col space-y-4 items-center justify-center lg:flex-row lg:space-x-3">
          <div className="mt-4">
          <button className="bg-gradient-to-r from-[#feb019] via-[#e39601] to-[#f59292] px-12 transition duration-500 py-5 rounded-full">
            EXPLORE ITEMS
          </button>
          </div>
          <div>
          <HeroConnectButton />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex">
        <Image
          className="w-[650px] rounded-xl"
          src="/hero.jpg"
          width={20}
          height={20}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default Hero;

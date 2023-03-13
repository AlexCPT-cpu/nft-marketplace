import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between px-6 lg:px-16 mt-10">
      <div className="lg:hidden flex justify-center mx-auto text-center items-center">
        <Image
          priority
          className="animate-bounce delay-500 transition-all w-[400px] object-cover"
          src="/card.png"
          alt="card"
          width={100}
          height={100}
        />
        <Image
          priority
          className="animate-bounce delay-300 absolute left-14 rotate-90 transition-all w-[400px] object-cover"
          src="/card.png"
          alt="card"
          width={100}
          height={100}
        />
      </div>

      <div className="flex text-center lg:text-left flex-col space-y-5">
        <div>
          <h1 className="font-semibold text-5xl text-black dark:text-gray-500 mb-5">
            Create, sell, or collect
            <br />
            digital items secured with
            <br />
            <span className="bg-clip-text text-transparent bg-[#feb019]">
              Blockchain.
            </span>{" "}
          </h1>
        </div>

        <div>
          <p className="text-black dark:text-gray-500 text-xl">
            Building trust in the metaverse.The credible canvas for NFT Activity
          </p>
        </div>
      </div>

      <div className="flex-row relative hidden lg:flex">
        <Image
          priority
          className="animate-bounce delay-500 transition-all w-[400px] object-cover"
          src="/card.png"
          alt="card"
          width={100}
          height={100}
        />
        <Image
          priority
          className="animate-bounce delay-300 absolute right-14 rotate-90 transition-all w-[400px] object-cover"
          src="/card.png"
          alt="card"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Landing;

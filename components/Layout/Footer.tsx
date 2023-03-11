import React from "react";
import Image from "next/image";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-20 mb-8">
      <hr className="w-full border-orange-300 dark:border-orange-400" />

      <div className="p-14 flex justify-between flex-row text-black dark:text-gray-400">
        <div className="space-y-3">
          <div>
            <a href="/">
              <div className="flex flex-row font-bold text-xl items-center">
                <Image
                  className="object-fit w-12 rounded-full"
                  src="/poke.jpg"
                  width={200}
                  height={200}
                  alt="card image"
                />{" "}
                &nbsp; &nbsp; ICU
              </div>
            </a>
          </div>

          <div className="text-xl">
            We offer a wide range of non-fungible tokens,
            <br />
            including art, censorship-resistant domain
            <br />
            names and other collectibles
          </div>

          <div className="flex flex-row items-center space-x-2">
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <AiOutlineInstagram size={22} />
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <FaTwitter size={20} />
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <BsFacebook size={20} />
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <FaLinkedin size={20} />
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">My Pages</h3>
          <ul>
            <li>
              <a href="/">Discover</a>
            </li>
            <li>
              <a href="/">Creators</a>
            </li>
            <li>
              <a href="/">Collectors</a>
            </li>
            <li>
              <a href="/">Ranking</a>
            </li>
            <li>
              <a href="/">Bid</a>
            </li>
            <li>
              <a href="/">Profile</a>
            </li>
            <li>
              <a href="/">Profile Edit</a>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">Web Links</h3>
          <ul>
            <li>
              <a href="/">Create NFT</a>
            </li>
            <li>
              <a href="/">Upload Variants</a>
            </li>
            <li>
              <a href="/">Collection Activity</a>
            </li>
            <li>
              <a href="/">Support</a>
            </li>
            <li>
              <a href="/">Support Detail</a>
            </li>
            <li>
              <a href="/">Activity</a>
            </li>
            <li>
              <a href="/">Table Option</a>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">Other Pages</h3>
          <ul>
            <li>
              <a href="/">Signin</a>
            </li>
            <li>
              <a href="/">Signup</a>
            </li>
            <li>
              <a href="/">Forgot Password</a>
            </li>
            <li>
              <a href="/">Verification</a>
            </li>
            <li>
              <a href="/">Carousel</a>
            </li>
            <li>
              <a href="/">Form Option</a>
            </li>
            <li>
              <a href="/">Form Wizard</a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="w-full border-orange-300 dark:border-orange-400" />

      <p className="text-center mt-6">
      Designed and Developed by <span className="text-orange-400"><a href="/">@IceLabs</a></span>
        </p>
    </div>
  );
};

export default Footer;

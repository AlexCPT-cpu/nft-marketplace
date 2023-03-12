import React from "react";
import Image from "next/image";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-20 mb-8">
      <hr className="w-full border-orange-300 dark:border-orange-400" />

      <div className="py-14 lg:px-16 px-8  flex justify-between flex-col space-y-6 lg:flex-row text-black dark:text-gray-400">
        <div className="space-y-3">
          <div>
            <Link href="/">
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
            </Link>
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
              <Link href="/">
                <AiOutlineInstagram size={22} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <FaTwitter size={20} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <BsFacebook size={20} />
              </Link>
            </div>
            <div className="ring-1 rounded-full p-2 hover:text-gray-500 ring-orange-300 dark:ring-orange-400 cursor-pointer">
              <Link href="/">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">My Pages</h3>
          <ul>
            <li>
              <Link href="/">Discover</Link>
            </li>
            <li>
              <Link href="/">Creators</Link>
            </li>
            <li>
              <Link href="/">Collectors</Link>
            </li>
            <li>
              <Link href="/">Ranking</Link>
            </li>
            <li>
              <Link href="/">Bid</Link>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
            <li>
              <Link href="/">Profile Edit</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">Web Links</h3>
          <ul>
            <li>
              <Link href="/">Create NFT</Link>
            </li>
            <li>
              <Link href="/">Upload Variants</Link>
            </li>
            <li>
              <Link href="/">Collection Activity</Link>
            </li>
            <li>
              <Link href="/">Support</Link>
            </li>
            <li>
              <Link href="/">Support Detail</Link>
            </li>
            <li>
              <Link href="/">Activity</Link>
            </li>
            <li>
              <Link href="/">Table Option</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold text-2xl mb-4">Other Pages</h3>
          <ul>
            <li>
              <Link href="/">Signin</Link>
            </li>
            <li>
              <Link href="/">Signup</Link>
            </li>
            <li>
              <Link href="/">Forgot Password</Link>
            </li>
            <li>
              <Link href="/">Verification</Link>
            </li>
            <li>
              <Link href="/">Carousel</Link>
            </li>
            <li>
              <Link href="/">Form Option</Link>
            </li>
            <li>
              <Link href="/">Form Wizard</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="w-full border-orange-300 dark:border-orange-400" />

      <p className="text-center mt-6">
        Designed and Developed by{" "}
        <span className="text-orange-400">
          <Link href="/">@IceLabs</Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;

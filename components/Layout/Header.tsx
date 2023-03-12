"use client";
import React, { useEffect, useState } from "react";
import {
  WalletIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const TOP_OFFSET = 66;

export const Header = () => {
  const [theme, setTheme] = useState<string>("system");
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;

      case "light":
        document.documentElement.classList.remove("dark");
        break;

      default:
        break;
    }
  }, [theme]);

  useEffect(() => {
    const handleScrolY = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScrolY);

    return () => {
      window.removeEventListener("scroll", handleScrolY);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {" "}
      {navOpen === false ? (
        <nav
          className={`flex transition duration-500 top-0 z-10 backdrop-blur-lg border-b border-white dark:border-[#092940] fixed w-full bg-[#eee] dark:bg-[#051e2f] justify-between items-center ${
            scrolling && "bg-opacity-30 dark:bg-opacity-80"
          }`}
        >
          <div className="flex justify-between mt-6 px-4">
            <div className="flex justify-center items-center">
              <Link title="Logo" href="/">
                <Image
                  className="object-fit w-12 mr-7 rounded-full mb-5"
                  src="/poke.jpg"
                  width={200}
                  height={200}
                  alt="card image"
                />
              </Link>
            </div>
            <div className="hidden lg:flex flex-row justify-between mt-1 space-x-8">
              <Link href="/">Home</Link>
              <Link href="/discover">Discover </Link>
              <Link href="/">Creators</Link>
              <Link href="/">Collectors</Link>
              <Link href="/">Stats </Link>
              <Link href="/">Customize</Link>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="hidden lg:flex  flex-row justify-center items-center p-6">
                  <div className="border-l border-r border-b border-t border-black dark:border-[#7A756D] justify-center items-center p-1 rounded-tl-md rounded-bl-md">
                    <MagnifyingGlassIcon className="w-6 fill-black dark:fill-[#7A756D]" />
                  </div>
                  <div className=" border-r border-b border-t border-black dark:border-[#7A756D] justify-center items-center p-1 rounded-tr-md rounded-br-md">
                    <input
                      className="outline-none border-transparent bg-transparent"
                      type="text"
                      placeholder="Type of Search"
                    />
                  </div>
                  <button hidden>submit</button>
                </div>
              </form>
            </div>

            <div className="mt-1 lg:mt-5 mr-2">
              <div className="rounded-full p-2 bg-gradient-to-r cursor-pointer from-yellow-300 to-orange-400">
                <WalletIcon className="w-6 stroke-white" />
              </div>
            </div>

            <div className="mt-1 lg:mt-5 mr-2">
              <div className="rounded-full p-2 bg-gradient-to-r cursor-pointer from-yellow-300 to-orange-400">
                <BellIcon className="w-6 stroke-white" />
              </div>
            </div>

            <div className="mt-1 lg:mt-5">
              <div className="rounded-full p-2 mr-2 cursor-pointer bg-gradient-to-r transition-all from-yellow-300 to-orange-400">
                {theme === "light" ? (
                  <MoonIcon
                    onClick={() => setTheme("dark")}
                    className="w-6 stroke-white transition-all"
                  />
                ) : (
                  <SunIcon
                    onClick={() => setTheme("light")}
                    className="w-6 stroke-white transition-all"
                  />
                )}
              </div>
            </div>

            <div className="flex lg:hidden cursor-pointer">
              <Bars3Icon
                onClick={() => setNavOpen(true)}
                className="w-10 ml-2 mr-2 fill-black dark:fill-gray-600 dark:hover:fill-gray-700"
              />
            </div>
          </div>
        </nav>
      ) : (
        <MobileNav visible={navOpen} visibility={setNavOpen} />
      )}
    </>
  );
};

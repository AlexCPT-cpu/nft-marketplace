import { MobileNavProps } from "@/types/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MobileStatsMenu from "./MobileStatsMenu";

const MobileNav = ({ visible, visibility }: MobileNavProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full h-full z-10 flex transition duration-500 top-0 backdrop-blur-lg fixed">
      <div className="relative">
        <div className="absolute left-5 cursor-pointer top-5">
          <XMarkIcon
            onClick={() => visibility(false)}
            className="w-10 fill-black dark:fill-gray-600 dark:hover:fill-gray-700"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center mx-auto font-semibold text-xl mt-1 space-y-10">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex  flex-row justify-center items-center p-6">
              <div className="border-l border-r border-b border-t border-black dark:border-[#7A756D] justify-center items-center p-2 rounded-tl-md rounded-bl-md">
                <MagnifyingGlassIcon className="w-7" />
              </div>
              <div className=" border-r text-normal border-b border-t border-black dark:border-[#7A756D] justify-center items-center p-2 rounded-tr-md rounded-br-md">
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

        <div>
          <Link
            onClick={() => {
              visibility(false);
            }}
            href="/"
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            onClick={() => {
              visibility(false);
            }}
            href="/discover"
          >
            Discover{" "}
          </Link>
        </div>
        <div>
          <Link
            onClick={() => {
              visibility(false);
            }}
            href="/creators"
          >
            Creators
          </Link>
        </div>
        <div>
          <Link
            onClick={() => {
              visibility(false);
            }}
            href="/collectors"
          >
            Collectors
          </Link>
        </div>
        <div>
          <MobileStatsMenu visibility={visibility} />
        </div>
        <div>
          <Link
            onClick={() => {
              visibility(false);
            }}
            href="/create"
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

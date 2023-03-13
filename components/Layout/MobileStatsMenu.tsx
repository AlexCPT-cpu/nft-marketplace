import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import Link from "next/link";

interface Props {
  visibility: (state: boolean) => void;
}

const MobileStatsMenu: React.FC<Props> = ({ visibility }) => {
  return (
    <div className="w-28 text-center">
      <Menu
        as="div"
        className="relative inline-block text-right text-black dark:text-white"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center bg-opacity-20 px-4 py-2 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Stats
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mx-auto mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-800 rounded-md bg-white border border-gray-300 dark:border-gray-800 dark:bg-[#041824] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={() => {
                      visibility(false);
                    }}
                    href="/stats/ranking"
                    className={`${
                      active
                        ? "bg-violet-500 text-black dark:text-white"
                        : "text-black dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Ranking
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={() => {
                      visibility(false);
                    }}
                    href="/stats/activity"
                    className={`${
                      active
                        ? "bg-violet-500 text-black dark:text-white"
                        : "text-black dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Activity
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MobileStatsMenu;

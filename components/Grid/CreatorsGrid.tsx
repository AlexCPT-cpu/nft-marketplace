import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import CreatorCard from '../Cards/CreatorCard'

const CreatorsGrid = () => {
  return (
    <div className="mx-auto mt-32 text-center justify-center items-center">
    <div className="flex flex-col md:flex-row justify-between px-3 lg:px-10 mb-6">
      <div className="flex flex-row items-center px-4 py-1 text-black dark:text-gray-400">
        <div className="px-4 py-2 items-center border dark:border-[#2c3641] transition-all hover:text-white rounded-md flex flex-row cursor-pointer hover:bg-yellow-600">
          Filter <ChevronDownIcon className="w-4 ml-2" />
        </div>
      </div>

      <div className="flex flex-row items-center px-4 py-1">
        <div className="font-semibold bg-neutral-200 dark:border-[#2c3641] dark:bg-neutral-900 border-l border-t border-b border-r rounded-tl-md rounded-bl-md px-4 py-2">
          Sort By
        </div>
        <div className="border-r flex flex-row border-t dark:border-[#2c3641] border-b rounded-tr-md rounded-br-md px-4 py-2">
          Most Recent
          <ChevronDownIcon className="w-4 ml-2" />
        </div>
      </div>
    </div>
    <hr className="mb-8 mx-7 md:mx-14" />
    <div className="grid grid-cols-1 md:grid-cols-2 md:pl-12 lg:grid-cols-4 mx-auto items-center justify-center pl-10 gap-8">
      <CreatorCard background='/bg4.jpg' />
      <CreatorCard background='/bg3.jpg' />
      <CreatorCard background='/bg2.jpg' />
      <CreatorCard background='/bg1.jpg' />
      <CreatorCard background='/bg1.jpg' />
      <CreatorCard background='/bg3.jpg' />
      <CreatorCard background='/bg4.jpg' />
      <CreatorCard background='/bg2.jpg' />
    </div>
  </div>
  )
}

export default CreatorsGrid
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import React from 'react'

const CreateAndSell = () => {
  return (
    <div className='mt-16 px-8 lg:px-16 flex flex-col text-center lg:justify-between mx-auto justify-center items-center'>
        <div>
            <ShoppingBagIcon className='w-72 fill-[#feb019] transition animate-pulse' />
        </div>

        <div>
        <div className='text-2xl lg:text-4xl text-left text-black dark:text-gray-500 '>
        Create and sell your NFTs
        </div>
        </div>
    </div>
  )
}

export default CreateAndSell
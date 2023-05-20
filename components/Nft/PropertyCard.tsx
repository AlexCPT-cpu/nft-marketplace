import { PropertyProps } from '@/types/types'
import React from 'react'

const PropertyCard = ({title, trait, value}: PropertyProps) => {
  return (
    <div className='border border-dashed px-4 py-3 rounded-sm min-w-full lg:min-w-[270px]'>
        <p className='text-[#feb019] text-lg font-semibold'>{title}</p>
        <p className='dark:text-neutral-300 text-xl font-semibold'>{trait}</p>
        {/* <p className='dark:text-gray-500 text-sm'>{value} have this trait</p> */}
    </div>
  )
}

export default PropertyCard
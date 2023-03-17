import React from 'react'
import NftCard from './NftCard'
import Properties from './Properties'

const Nft = () => {
  return (
    <div className='flex w-full flex-col'>
        <NftCard />
        <Properties />
    </div>
  )
}

export default Nft
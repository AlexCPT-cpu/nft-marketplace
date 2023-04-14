import React from 'react'
import NftCard from './NftCard'
import Properties from './Properties'

const Nft = ({ nft, collection }: { nft: any, collection: string }) => {
  console.log(nft)
  return (
    <div className='flex w-full flex-col'>
        <NftCard image={nft[0]?.media[0]?.thumbnail} />
        <Properties />
    </div>
  )
}

export default Nft
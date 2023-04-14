import React, { useEffect, useMemo, useState } from 'react'
import UserNftCard from '../Cards/UserNftCard'
import { NftData, UserNftGrid } from '@/types/types'
import fetch from '@/helpers/fetch'

const CollectionNftGrid = ({ address }: { address: string }) => {

  const [colNfts, setColNfts] = useState<any>()

  useEffect(() => {
    const getData = async () => {
    const response = await fetch('POST', '/api/collection', {
      address: address
    })
    setColNfts(response?.data)
  }
 getData()
  }, [address])

  return (
    <div className="grid transition-all grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto items-center justify-center gap-8">
      {colNfts?.nfts?.map((nft: NftData, i: number) => (
        <UserNftCard
          image={nft.media[0]?.thumbnail}
          key={i}
          name={nft.title}
          nftAddress={nft.contract.address}
          nftId={nft.tokenId}
        />
      ))}
    </div>
  );
}

export default CollectionNftGrid
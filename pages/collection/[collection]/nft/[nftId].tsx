import Nft from '@/components/Nft/Nft'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from '@/helpers/fetch'
import { NftData } from '@/types/types'

const NftId = () => {

  const router = useRouter()
  const { collection, nftId } = router.query

  const [colNfts, setColNfts] = useState<any>()

  useEffect(() => {
    const getData = async () => {
    const response = await fetch('POST', '/api/collection', {
      address: collection
    })
    setColNfts(response?.data)
  }
 getData()
  }, [collection])

  const indexedNft = useMemo(() => {
    const returned: NftData[] = []
    const parsed = colNfts?.nfts?.map((nft: NftData) => {
      if(nft.tokenId === nftId) {
        returned.push(nft)
      }
    })
    return returned
  }, [colNfts, nftId])

  return (
    <div className='mt-28 px-4 lg:px-16'>
      {/*@ts-ignore */}
        <Nft collection={collection} nft={indexedNft} />
    </div>
  )
}

export default NftId
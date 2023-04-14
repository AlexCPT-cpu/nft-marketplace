import Collection from '@/components/Collection/Collection'
import { useRouter } from 'next/router';
import React from 'react'

const CollectionPage = () => {

  const router = useRouter();
  const { collection } = router.query;
  return (
    <div className='mt-32 px-4 lg:px-16'>
      {/*@ts-ignore */}
      <Collection address={collection} />
    </div>
  )
}

export default CollectionPage
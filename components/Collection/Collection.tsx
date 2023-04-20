import React from 'react'
import CollectionCard from './CollectionCard'
import CollectionNav from './CollectionNav'

const Collection = ({ address }: { address: string}) => {

  return (
    <div>
        <CollectionCard address={address} />
        <CollectionNav address={address} />
    </div>
  )
}

export default Collection
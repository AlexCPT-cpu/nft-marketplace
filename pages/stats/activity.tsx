import Activity from '@/components/Activity/Activity'
import Meta from '@/components/Meta/Meta'
import React from 'react'

const activity = () => {
  return (
    <div>
      <Meta
        title="NFT Marketplace Activity"
        desc="nft auction and marketplace"
      />
      <Activity />
    </div>
  );
}

export default activity
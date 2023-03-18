import React from 'react'
import UserNftCard from '../Cards/UserNftCard'
import { UserNftGrid } from '@/types/types'

const CollectionNftGrid: React.FC<UserNftGrid> = ({ }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto items-center justify-center gap-8">
        <UserNftCard />
        <UserNftCard />
        <UserNftCard />
        <UserNftCard />
        <UserNftCard />
        <UserNftCard />
        <UserNftCard />
    </div>
  )
}

export default CollectionNftGrid
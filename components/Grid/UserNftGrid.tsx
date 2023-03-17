import React from 'react'
import UserNftCard from '../Cards/UserNftCard'
import { UserNftGrid } from '@/types/types'

const UserNftGrid: React.FC<UserNftGrid> = ({ active }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:pl-6 lg:grid-cols-4 mx-auto items-center justify-center pl-1 gap-8">
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

export default UserNftGrid
import React from 'react'
import UserNftCard from '../Cards/UserNftCard'

const UserNftGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:pl-12 lg:grid-cols-4 mx-auto items-center justify-center pl-10 gap-8">
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
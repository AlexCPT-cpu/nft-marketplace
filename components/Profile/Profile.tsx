import React from 'react'
import ProfileCard from './ProfileCard'

const Profile = () => {
  return (
    <div>
        <div className='text-3xl font-bold'>
            Edit User Profile
            <div className='w-full my-3 bg-black/60 border-black/60 dark:bg-white/60 border dark:border-white/60'></div>
        </div>

        <div>
            <ProfileCard />
        </div>
    </div>
  )
}

export default Profile
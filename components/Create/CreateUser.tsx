import React from 'react'
import CreatePage from './CreatePage'


const CreateUser: React.FC<{referralId: string}> = ({ referralId }) => {
  return (
    <div>
        <div className='text-3xl font-bold'>
            Create Profile
            <div className='w-full my-3 bg-black/60 border-black/60 dark:bg-white/60 border dark:border-white/60'></div>
        </div>

        <div>
            <CreatePage referralId={referralId} />
        </div>
    </div>
  )
}

export default CreateUser
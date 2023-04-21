import React from 'react'
import CreateColCard from './CreateColCard'

const CreateCollection = () => {
  return (
    <div>
        <div className='text-3xl font-bold'>
            Create a New Collection
            <div className='w-full my-3 bg-black/60 border-black/60 dark:bg-white/60 border dark:border-white/60'></div>
        </div>

        <div>
            <CreateColCard />
        </div>
    </div>
  )
}

export default CreateCollection
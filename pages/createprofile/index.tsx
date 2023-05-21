import CreateUser from '@/components/Create/CreateUser'
import React, { useEffect, useState } from 'react'

const Editprofile = () => {
  const [refId, setRefId] = useState('')

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const referral = urlParams.get("referral");
      setRefId(referral as string);
    }
  }, []);

  return (
    <div className='mt-32 px-4 lg:px-16'>
      <CreateUser referralId={refId} />
    </div>
  )
}

export default Editprofile
import Head from 'next/head'
import Hero from '@/components/Home/Hero'
import TrendingAuctions from '@/components/Home/TrendingAuctions'
import CreatorOfTheWeek from '@/components/Home/CreatorOfTheWeek'
import TopCollections from '@/components/Home/TopCollections'
import CreateAndSell from '@/components/Home/CreateAndSell'
import Meta from '@/components/Meta/Meta'


export default function Home() {

  return (
    <>
      <Meta title='NFT Marketplace' desc='nft auction and marketplace' />

      <div className='mt-32'>
        <Hero />
        <TrendingAuctions />
        <CreatorOfTheWeek />
        <TopCollections />
        <CreateAndSell />
      </div>
    </>
  )
}

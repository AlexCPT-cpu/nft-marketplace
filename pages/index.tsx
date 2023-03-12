import Head from 'next/head'
import { Inter } from 'next/font/google'
import Hero from '@/components/Home/Hero'
import TrendingAuctions from '@/components/Home/TrendingAuctions'
import CreatorOfTheWeek from '@/components/Home/CreatorOfTheWeek'
import TopCollections from '@/components/Home/TopCollections'
import CreateAndSell from '@/components/Home/CreateAndSell'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="nft auction and marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

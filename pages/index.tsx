import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NftGrid from '@/components/Nft/NftGrid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    /*useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light'
    
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark'
    
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme')
  }, [])*/
  
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="nft auction and marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NftGrid />
    </>
  )
}

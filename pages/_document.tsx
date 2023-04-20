import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='light' lang="en">
      <Head />
      <body className='bg-white text-black dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

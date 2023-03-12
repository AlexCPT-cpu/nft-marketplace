import React, { useState } from 'react'

const  useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('')

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText('')
      return false
    }
  }

  return [copiedText, copy] as const
}

export default useCopyToClipboard

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize game state in localStorage if not exists
    if (typeof window !== 'undefined' && !localStorage.getItem('harvestDaysPlayers')) {
      localStorage.setItem('harvestDaysPlayers', JSON.stringify({}))
    }
  }, [])

  return <Component {...pageProps} />
}

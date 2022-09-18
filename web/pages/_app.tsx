import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Theme } from '../components'

function App({ Component, pageProps }: AppProps) {
  return (
  <Theme>
  <Component {...pageProps} />
  </Theme>
  )
}

export default App

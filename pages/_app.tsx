import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '../components/Navbar'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
// import Cart from './cart'
import { CartContext } from '../context/CartContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {



    const [isSSR, setIsSSR] = useState(true)
    
    useEffect(()=> {
      setIsSSR(false)
    }, [])
    
    if(isSSR) return null


    const queryClient = new QueryClient()



    return(
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN!}>
        <QueryClientProvider client={queryClient}>
          <CartContext>
            <Toaster />
            <Layout>
            <Component {...pageProps} />
            </Layout>
          </CartContext>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    ) 
}

export default MyApp

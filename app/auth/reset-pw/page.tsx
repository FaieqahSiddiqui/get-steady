"use client";
import { useState,useEffect } from "react";
import { Logo } from "@/app/components/Logo";
import LandingHeader from "@/app/components/LandingHeader";
import ResetPW from "../components/ResetPW";
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/clients'



const page = () => {
  

  // const token = searchParams.get('access_token')


  // useEffect(() => {
  //   console.log('access_token:', token)
  // }, [token])

  const [sessionReady, setSessionReady] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      setError('Reset code not found in URL.')
      return
    }


    const exchangeSession = async () => {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code:', error.message)
        setError('Invalid or expired reset link.')
      } else {
        setSessionReady(true)
      }
    }

    exchangeSession()
  }, [searchParams])

  if (error) return <p className="text-red-600 p-4">{error}</p>
  if (!sessionReady) return <p className="p-4">Setting up your session...</p>

    
  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-heroBgStart to-BG 
    "
    >
      <LandingHeader />

      {/* Optional decorative overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)] " />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-26 pb-12 ">
        <div className="mb-10 transform hover:scale-105 transition-transform">
          <Logo className="h-8 w-8" />
        </div>

        <div className="w-full rounded-2xl bg-BG/80 p-6 md:p-8 shadow-2xl max-w-md">
          <div className="text-center mb-6 space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              Reset your password
            </h2>
            <p className="text-greyText">
              Enter your email and we'll send you reset instructions
            </p>
          </div>

          <ResetPW/>
        </div>

        
      </div>
    </div>
  );
};

export default page;

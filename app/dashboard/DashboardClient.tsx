'use client'
import React from 'react'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { signout } from '../auth/components/actions';
import { User } from '@supabase/auth-js'; // Import the User type from Supabase
import { useSearchParams } from 'next/navigation'



// type User = {
//     email: string | undefined;
//   user_metadata: {
//     full_name: string;
//   };
//   };

  // Props to accept 'user' which can be undefined
type Props = {
    user: User | null;
  };
const DashboardClient = ({user}:Props) => {

    const searchParams = useSearchParams()
    const loginStatus = searchParams.get('login')
    const toastShown = useRef(false)

    // useEffect(() => {
    //     toast.success(`Welcome back, ${user?.user_metadata.full_name || user?.email}! 🎉`)
    //   }, [loginStatus]);


    useEffect(() => {
        if (loginStatus === 'success' && !toastShown.current) {
          toast.success('Login successful! 🎉')
          toastShown.current=true
          
          // Clear the query param from the URL
          const newUrl = window.location.pathname
          window.history.replaceState({}, '', newUrl)
        }
      }, [loginStatus])
      

      if (!user) {
        return <div>Loading...</div>; // Show loading state if user is not available
      }
    
  return (
    <div className="pt-26">
      <h1>Welcome, {user?.user_metadata.full_name || user?.email}</h1>
      {/* Show more user info if needed */}
      <form>
        <button formAction={signout} type="submit" className="bg-blue-500">
          Log out
        </button>
      </form>
    </div>
  )
}

export default DashboardClient
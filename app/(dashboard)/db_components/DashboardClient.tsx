'use client'
import React from 'react'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { signout } from '../auth/components/actions';
import { User } from '@supabase/auth-js'; // Import the User type from Supabase
import { useSearchParams } from 'next/navigation'
import { useUser } from '../components/UserProvider';


import UserProvider from "../components/UserProvider";

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
  //{user}:Props
const DashboardClient = () => {
  
  const {user} = useUser();


    // useEffect(() => {
    //     toast.success(`Welcome back, ${user?.user_metadata.full_name || user?.email}! 🎉`)
    //   }, [loginStatus]);


    
      

      if (!user) {
        return <div>Loading...</div>; // Show loading state if user is not available
      }
    
  return (
    <div className="pt-26 pl-20">
      <h1>Welcome, {user?.user_metadata.full_name || user?.email}</h1>
      {/* Show more user info if needed */}
      {/* <form>
        <button formAction={signout} type="submit" className="bg-blue-500">
          Log out
        </button>
      </form> */}
    </div>
  )
}

export default DashboardClient
'use client'
import {createContext, useState, useContext } from 'react'
import { User } from '@supabase/auth-js'; // Type for Supabase user



// 1. Define the shape of your context data
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// 2. Create the context with an initial value (undefined for now)
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Create the custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// 3. Create the Provider component to wrap your app
const UserProvider = ({ children, initialUser }: { children: React.ReactNode; initialUser: User|null }) => {
    const [user, setUser] = useState<User | null>(initialUser); // store user

  return (
     <UserContext.Provider value={{ user, setUser }}>
      {children} {/* This will wrap the rest of your app */}
    </UserContext.Provider>
  )
}

export default UserProvider


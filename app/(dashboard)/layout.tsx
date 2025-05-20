import React, { ReactNode } from "react";
import { createClient } from "@/app/utils/supabase/server";
//import Sidebar from "./db_components/Sidebar";
//import DashboardHeader from "../(dashboard)/db_components/DashboardHeader";
//import { User } from "@supabase/auth-js"; // Import the User type from Supabase
import LayoutWrapper from "./db_components/LayoutWrapper";
import UserProvider from "../components/UserProvider";

type Props = {
  children: ReactNode;
  //  user: User | null;
};
const  DashboardLayout = async ({ children }: Props) => {
 
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  
  return (
    <UserProvider initialUser={user}>
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
    </UserProvider>
  );
};

export default DashboardLayout;


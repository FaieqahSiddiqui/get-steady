import { createClient } from "@/app/utils/supabase/server";
import DashboardClient from "../DashboardClient";
import DashboardLayout from "../layout";
import { useUser } from "../../components/UserProvider";
import ToastHandler from "@/app/components/ToastHandler";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    // Optional: redirect to login if no user
    // Redirect to login if no user
    redirect('/auth');
  }
  //const { user } = useUser(); // ✅ use user from context



  
  return (
    <>
     <ToastHandler />
     {/* user={user || null} */}
      {/* <DashboardClient  /> */}
       <h1>Welcome, {user?.user_metadata.full_name || user?.email}</h1>
    
    </>
  );
}

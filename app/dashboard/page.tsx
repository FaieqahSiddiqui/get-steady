import LandingHeader from "../components/LandingHeader";
import { createClient } from "@/app/utils/supabase/server";
import { signout } from "../auth/components/actions";
import { redirect } from 'next/navigation';  // Needed for redirect
import DashboardClient from "./DashboardClient";


export default async function dashboard() {
  const supabase = await createClient();
  const {
    data: { user },error,} = await supabase.auth.getUser();

  if (!user) {
    // Optional: redirect to login if no user
    // Redirect to login if no user
    redirect('/auth');
  }
  


  return (
    <>
      <LandingHeader></LandingHeader>
      
      

      {/* <div className="pt-26"> */}
      {/* <h1>Welcome, {user?.user_metadata.full_name || user.email}!</h1> */}
      {/* <h1>Welcome, {user?.user_metadata.full_name || user?.email}</h1>
      <h1>Welcome, {user?.email}!</h1> */}
      {/* Show more user info if needed */}
    {/* </div>

    <form>
    <button formAction={signout} type="submit" className="bg-blue-500">Log out</button>
    </form> */}

<DashboardClient user={user || null} />
    
    </>
  );
}

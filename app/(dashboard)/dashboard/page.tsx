import { createClient } from "@/app/utils/supabase/server";
import DashboardClient from "../db_components/DashboardClient";
import DashboardLayout from "../layout";
import { useUser } from "../../contexts/UserContext";
import ToastHandler from "@/app/components/ToastHandler";
import { redirect } from "next/navigation";
import DashboardCalendar from "../db_components/DashboardCalendar";
import StatCard from "../db_components/StatCard";
import { getDashboardStats } from "@/app/utils/dashboardStats";

import { Sparkles } from "lucide-react";
import { startTransition } from "react";
import HabitLogs from "../db_components/HabitLogs";

export default async function dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    // Optional: redirect to login if no user
    // Redirect to login if no user
    redirect("/auth");
  }
  //const { user } = useUser(); // ✅ use user from context

  // Fetch or calculate all your stats on the server
  const stats = await getDashboardStats();

  return (
    <>
      <ToastHandler />
      {/* user={user || null} */}
      {/* <DashboardClient  />  border-2 border-green-400 */}
      <div className="  bg-transparent flex flex-col h-full space-y-4 overflow-auto max-w-7xl mx-auto  ">
        {/* <h1>Welcome, {user?.user_metadata.full_name || user?.email}</h1> */}

        <div className="bg-gradient-to-r  from-footerBgStart to-footerBgEnd/80 rounded-lg px-3 py-2 relative ">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]" />

          <div>
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-md font-semibold text-white">
                  Welcome, {user?.user_metadata.full_name} 👋
                </h1>

                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium text-white">
                    Add Habit
                  </span>
                </div>
              </div>

              {/* Optional: right-side content can go here */}
            </div>

            {/* <p className="text-blue-100 text-sm">
              Here's your progress for today
            </p> */}
          </div>

          {/* StatsGRID CONTAINER */}
          <div className="w-full h-fit grid grid-cols-4 gap-4 mt-2">
            {/* <h3>Top Cards</h3> */}

            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                bottomText={stat.bottomText}
                tooltip={stat.tooltip}
              />
            ))}
          </div>
        </div>

        {/* Calendar & Habit Logs */}

        <div className="border-2 border-pink-400 flex justify-end">
          <HabitLogs />
        </div>

        <div className="border ">Monthly/Weekly Activity</div>

        <div className="flex justify-between w-full gap-5">
          <div className="border w-1/2">Frequency Graph</div>

          <div className="border w-1/2">Habit Category Graph</div>
        </div>

        {/* Right SIDE */}
        {/* <div className="bg-BG max-w-1/4 flex flex-col flex-grow border-2 border-blue-600 items-center">
         <h3>Right</h3> 
          <div className="flex justify-center">
            <DashboardCalendar />
          </div>
          <div>
            <h1>Habit Coach</h1>
          </div>
        </div> */}
      </div>
    </>
  );
}

import { supabase } from "./supabase/createClient";
import { calculateStreak } from "@/app/utils/calculateStreak";
import { createClient } from "@/app/utils/supabase/server";



interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  color:string;
}

export async  function getDashboardStats():Promise<DashboardStat[]> {
  // 🧮 Do all your logic here (DB queries, API calls, calculations, etc.)
  // Example: this could be Prisma queries or external API calls

// ✅ Create an authenticated Supabase client with cookies
  const supabase = await createClient();


 // ✅ Fetch habits belonging to this user
  const { data: habits, error, count } = await supabase
    .from("Habit")
    .select(
      `
      id,
      name,
      HabitLog(id, date, completed)
      `,
      { count: "exact" }
    )
   

  if (error) {
    console.error("Error fetching habits:", error);
    return [];
  }

  console.log("Fetched habits:", habits);

  // ✅ If you get `[]`, try temporarily removing the `.eq("userId", userId)` filter
  // to confirm your column name or value matches exactly.

  const totalHabits = count ?? 0;




  // inside your server function where supabase is already created via createClient()
const oneMonthAgo = new Date();
oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
const isoOneMonthAgo = oneMonthAgo.toISOString().split("T")[0]; // YYYY-MM-DD

// Fetch habit logs in last 30 days for this user (RLS will scope to the user)
const { data: logs30, error: logs30Error } = await supabase
  .from("HabitLog")
  .select("habit_id, date")
  .gte("date", isoOneMonthAgo);

if (logs30Error) {
  console.error("Error fetching last-30-day logs:", logs30Error);
  // handle error...
}

const uniqueHabitIds = new Set((logs30 || []).map(l => l.habit_id));
const activeHabitCount = uniqueHabitIds.size;
console.log("Active habits (last 30 days):", activeHabitCount);


  // const habits = 12340;
  // const revenue = 54320;
  // const orders = 1254;
  // const conversionRate = 4.2;
  // const sessions = 215;
  // const signups = 89;



  return [
    { title: "Total Habits", value: totalHabits, icon: "star", color:"yellow-400" },
    //{ title: "Longest Streak", value: "$54,320", icon: "flame",color:"blue-500" },
    { title: "Days Engaged", value: "1,254", icon: "orders", color:"yellow-400" },
    { title: "Consistency Score", value: "4.2%", icon: "conversion", color:"yellow-400" },
    { title: "Overall Completion", value: "215", icon: "sessions",color:"yellow-400" },
    // { title: "New Signups", value: "89", icon: "signups", color:"yellow-400" },
  ];
}

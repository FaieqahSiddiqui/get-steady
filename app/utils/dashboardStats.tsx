import { createClient } from "@/app/utils/supabase/server";

interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  bottomText: string;
  tooltip?: string; // new

}

export async function getDashboardStats(): Promise<DashboardStat[]> {
  // 🧮 Do all your logic here (DB queries, API calls, calculations, etc.)
  // Example: this could be Prisma queries or external API calls

  // ✅ Create an authenticated Supabase client with cookies
  const supabase = await createClient();

  // ✅ Fetch habits belonging to this user
  const {
    data: habits,
    error,
    count,
  } = await supabase.from("Habit").select(
    `
      id,
      name,
      frequency,
      HabitLog(id, date, completed)
      `,
    { count: "exact" }
  );

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
    .select("habit_id, date, completed")
    .gte("date", isoOneMonthAgo);

  if (logs30Error) {
    console.error("Error fetching last-30-day logs:", logs30Error);
    // handle error...
  }

  const uniqueHabitIds = new Set((logs30 || []).map((l) => l.habit_id));
  const activeHabitCount = uniqueHabitIds.size;
  console.log("Active habits (last 30 days):", activeHabitCount);

  //Days engaged

  // Count distinct days with at least one log
  const uniqueDays = new Set((logs30 || []).map((l) => l.date.split("T")[0]));

  const daysEngaged = uniqueDays.size;
  console.log("Days engaged (last 30 days):", daysEngaged);

  //Consistency Score

  const consistencyScore = Math.round((uniqueDays.size / 30) * 100);

  //Overall completion

  const totalLogs = logs30?.length ?? 0;
  console.log(totalLogs, "TOTAL LOGSSSS");
  //const completedLogs = logs30?.filter(l => l.completed)?.length ?? 0;

  // console.log(completedLogs, "COMPLETED LOGSSSS");

  // const overallCompletion = totalLogs > 0
  //   ? Math.round((completedLogs / totalLogs) * 100)
  //   : 0;

  // -------------------------------------
  // EXPECTED LOGS
  // -------------------------------------
  let expectedLogs = 0;

  for (const habit of habits) {
    if (habit.frequency === "Daily") {
      expectedLogs += 30;
    }

    if (habit.frequency === "Weekly") {
      expectedLogs += Math.round(30 / 7);
    }

    if (habit.frequency === "Monthly") {
      expectedLogs += 1;
    }
  }

  // -------------------------------------
  // ACTUAL COMPLETED LOGS
  // -------------------------------------
  const completedLogs = logs30?.filter((l) => l.completed).length ?? 0;

  // -------------------------------------
  // OVERALL COMPLETION PERCENT
  // -------------------------------------
  const overallCompletion = expectedLogs
    ? Math.round((completedLogs / expectedLogs) * 100)
    : 0;

  return [
    {
      title: "Total Habits",
      value: totalHabits,
      icon: "star",
      color: "yellow-500",
      bottomText: `${activeHabitCount} active habits`,
      tooltip:"Total habits. Active habits logged in the last 30 days."
    },
    //{ title: "Longest Streak", value: "$54,320", icon: "flame",color:"blue-500" },
    {
      title: "Days Engaged",
      value: daysEngaged,
      icon: "orders",
      color: "yellow-400",
      bottomText: "Last 30 days",
      tooltip:"The number of days in the last 30 days when you logged at least one habit."
    },
    {
      title: "Consistency Score",
      value: `${consistencyScore}%`,
      icon: "conversion",
      color: "yellow-400",
      bottomText: "Last 30 days",
      tooltip:"Shows how consistently you logged habits over the last 30 days. Calculated as the percentage of days with at least one habit logged."
    },
    {
      title: "Overall Completion",
      value: overallCompletion,
      icon: "sessions",
      color: "yellow-400",
      bottomText: `${completedLogs}/ ${expectedLogs} (Last 30 days)`,
      tooltip:"Shows how many of the expected habit logs you completed in the last 30 days, accounting for each habit's frequency."
    },
  ];
}

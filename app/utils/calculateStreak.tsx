import { Habit, HabitLog } from "../constants/types";

export function calculateStreak(habit: Habit, habitLogs: HabitLog[]): number {
  if (!habitLogs || habitLogs.length === 0) return 0;

  //Filter completed logs and map to JS Date object

  const completedDates = habitLogs
    .filter((log) => log.completed)
    .map((log) => new Date(log.date).toLocaleDateString("en-CA"));

  //console.log("CompletedDates from streak function:", completedDates);

  if (completedDates.length === 0) return 0;

  const sortedDates = completedDates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());
  console.log("CompletedDates from streak function sorted:", sortedDates);

  const today = new Date().toLocaleDateString("en-CA");
  //console.log("Today:",today);

  let streak = 0;

  // 🔽 ADD HELPER FUNCTION HERE
  function hasLogOnOrBetween(start: Date, end: Date): boolean {
    return completedDates.some((d) => {
      const logDate = new Date(d);
      return logDate <= start && logDate >= end;
    });
  }

  let current = new Date();

  if (!completedDates.includes(today)) {
    current.setDate(current.getDate() - 1);
  }

  console.log("Current:", current);

  if (habit.frequency === "Daily") {
    //console.log("CompletedDates from streak function:", completedDates);

    while (true) {
      const currentStr = current.toLocaleDateString("en-CA");
      if (completedDates.includes(currentStr)) {
        streak++;

        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  } else if (habit.frequency === "Weekly") {
    console.log(
      "CompletedDates from streak function unsorted:",
      completedDates
    );

    console.log("Habit: ", habit.name);

    //const lastLog = sortedDates[0];

    let windowStart = new Date(); // today
    let windowEnd = new Date();
    windowEnd.setDate(windowStart.getDate() - 6); // 7-day window

    while (true) {
      if (!hasLogOnOrBetween(windowStart, windowEnd)) break;

      streak++;

      //Move window back by 7 days

      windowStart.setDate(windowStart.getDate() - 7);
      windowEnd.setDate(windowEnd.getDate() - 7);
    }

    return streak;
  } else if (habit.frequency === "Monthly") {
    // Convert completed logs/dates to YYYY-MM format and store them in a Set
    // Example: ["2023-08-15", "2023-09-02"] -> {"2023-08", "2023-09"}
    const completedMonths = new Set(
      completedDates.map((d) => d.slice(0, 7)) // "YYYY-MM"
    );

    // Start from current month
    let year = current.getFullYear();
    let month = current.getMonth(); // 0 = Jan, 11 = Dec
    const thisMonth = `${year}-${String(month + 1).padStart(2, "0")}`;

    // 🔽 If current month isn't logged yet, but it's still ongoing,
    // shift back to previous month so streak doesn't break prematurely
    if (!completedMonths.has(thisMonth)) {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    }

    while (true) {
      // Format current year+month as "YYYY-MM"
      const currentMonthString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}`;
      if (!completedMonths.has(currentMonthString)) break;

      streak++;

      // Move to previous month
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    }

    return streak;
  }

  return 0;
}

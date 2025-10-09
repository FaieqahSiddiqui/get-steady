import { Habit, HabitLog } from "../constants/types";

export function calculateCompletionRate(
  habit: Habit,
  logs: HabitLog[],
  windowSize?: number // optional
): number {
  if (!logs || logs.length === 0) return 0;

  const today = new Date();

  // Ensure windowSize always has a number
  let finalWindow = windowSize ?? 0;

  if (!windowSize) {
    if (habit.frequency === "Daily") finalWindow = 7;      // last 7 days
    else if (habit.frequency === "Weekly") finalWindow = 4; // last 4 weeks
    else if (habit.frequency === "Monthly") finalWindow = 6; // last 6 months
  }

  // Normalize completed log dates
  const completedDates = logs
    .filter((log) => log.completed)
    .map((log) => new Date(log.date).toLocaleDateString("en-CA")); // YYYY-MM-DD

  let totalUnits = 0;
  let completedUnits = 0;

  if (habit.frequency === "Daily") {
    for (let i = 0; i < finalWindow; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toLocaleDateString("en-CA");
      totalUnits++;
      if (completedDates.includes(key)) completedUnits++;
    }
  }

  if (habit.frequency === "Weekly") {
    for (let i = 0; i < finalWindow; i++) {
      const endOfWindow = new Date(today);
      endOfWindow.setDate(today.getDate() - i * 7);
      const startOfWindow = new Date(endOfWindow);
      startOfWindow.setDate(endOfWindow.getDate() - 6);

      const hasLogThisWeek = completedDates.some((d) => {
        const logDate = new Date(d);
        return logDate >= startOfWindow && logDate <= endOfWindow;
      });

      totalUnits++;
      if (hasLogThisWeek) completedUnits++;
    }
  }

  if (habit.frequency === "Monthly") {
    let year = today.getFullYear();
    let month = today.getMonth();

    for (let i = 0; i < finalWindow; i++) {
      const ym = `${year}-${String(month + 1).padStart(2, "0")}`;

      const hasLogThisMonth = completedDates.some((d) =>
        d.startsWith(ym) // YYYY-MM
      );

      totalUnits++;
      if (hasLogThisMonth) completedUnits++;

      // Move back one month
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    }
  }

  if (totalUnits === 0) return 0;
  return Math.round((completedUnits / totalUnits) * 100);
}

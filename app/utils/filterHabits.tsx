import { Habit, HabitLog } from "../constants/types";

export function shouldKeepHabit(
  habit: Habit,
  logs: HabitLog[],
  selectedDate: Date|null,
  completed: boolean | null
):boolean{
    if(!selectedDate) return true;
    const selectedDateStr = selectedDate.toLocaleDateString("en-CA");

  // ---- Daily ----
  if (habit.frequency === "Daily") {
    const hasLogToday = logs.some(
      (log) =>
        log.completed &&
        new Date(log.date).toLocaleDateString("en-CA") === selectedDateStr
    );

    if (completed === true) return hasLogToday;
    if (completed === false) return !hasLogToday;
    return true; // "All" → keep everything
  }

  // ---- Weekly (rolling 7 days including today) ----
  if (habit.frequency === "Weekly") {
    const endOfWindow = new Date(selectedDate);
    const startOfWindow = new Date(selectedDate);
    startOfWindow.setDate(selectedDate.getDate() - 6);

    const hasLogThisWeek = logs.some((log) => {
      const logDate = new Date(log.date);
      return (
        log.completed &&
        logDate >= startOfWindow &&
        logDate <= endOfWindow
      );
    });

    if (completed === true) return hasLogThisWeek;
    if (completed === false) return !hasLogThisWeek;
    return true;
  }

  // ---- Monthly (calendar month) ----
  if (habit.frequency === "Monthly") {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const hasLogThisMonth = logs.some((log) => {
      const logDate = new Date(log.date);
      return (
        log.completed &&
        logDate.getFullYear() === year &&
        logDate.getMonth() === month
      );
    });

    if (completed === true) return hasLogThisMonth;
    if (completed === false) return !hasLogThisMonth;
    return true;
  }

  // ---- Safety fallback ----
  return true;
}
"use client";
import { useEffect, useState } from "react";
//import { createClient } from "@/supabase/clients"; // This should return the browser-side supabase client
import { Habit, HabitWithLogs } from "../constants/types";
import { supabase } from "@/app/utils/supabase/createClient";
import { calculateStreak } from "../utils/calculateStreak";

export const useHabits = (
  sortBy: keyof Habit = "name", // default sort by name not`created_at`
  sortOrder: "asc" | "desc" = "asc", // default ascending order
  limit: number = 5,
  pageNumber: number = 1,
  searchTerm: string = "",
  category: string = "",
  frequency: string = "",
  selectedDate: Date | null,
  completed: boolean | null = null
) => {
  //const [habits, setHabits] = useState<Habit[]>([]);
  const [habits, setHabits] = useState<HabitWithLogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalHabits, setTotalHabits] = useState(0);

  console.log("useHabits hook called");
  console.log("Selected DDATEE Normal:", selectedDate);

  //console.log("Selected DDATEE hook Formatted:", selectedDate?.toISOString().split("T")[0])
  console.log(
    "Selected DDATEE hook Formatted:",
    selectedDate?.toLocaleDateString("en-CA")
  );

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);

    //const supabase = createClient();

    //console.log("Supabase client:", supabase);
    //console.log("Habits per page in the hook: ",limit);

    const from = (pageNumber - 1) * limit;
    const to = from + (limit - 1);

    //***********MAIN QUERY BEFORE HABIT LOG JOIN************
    //let query = supabase.from('Habit').select('*', {count: 'exact'}).order(sortBy, {ascending:sortOrder === 'asc'}).range(from,to);

    let query = supabase
      .from("Habit")
      .select(
        `*,
          HabitLog${completed == true ? "!inner" : ""}(
            id,
            date,
            completed
          )`,
        { count: "exact" }
      )
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(from, to);

    // if (completed !== null) {
    //       query = query.eq("HabitLog.completed", completed);
    //     }

    // ✅ Completed = true → only habits with at least one completed log
    if (completed === true) {
      query = query.eq("HabitLog.completed", true);
    }

    // ✅ Completed = false → habits with uncompleted log OR no log at all
    else if (completed === false) {
      query = query.or("HabitLog.completed.eq.false,HabitLog.id.is.null");
    }

    // if(selectedDate){
    //   //const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
    //   const formattedDate = selectedDate.toLocaleDateString("en-CA");
    //   query = query.eq('HabitLog.date',formattedDate);
    // }
    // Case-insensitive partial match for category
    if (category.trim() !== "" && category !== "All") {
      query = query.ilike("category", `%${category}%`);
    }

    // Case-insensitive partial match for category
    if (frequency.trim() !== "" && frequency !== "All") {
      query = query.ilike("frequency", `%${frequency}%`);
    }

    if (searchTerm.trim() !== "") {
      query = query.ilike("name", `%${searchTerm}%`);
    }

    const { data, count, error } = await query;

    //console.log("Supabase returned:", { data, error });

    if (error) {
      //console.error(error);
      setError(error.message ?? "Failed to fetch habits");
    } else {
      //habit streaks

      const enrichedHabits = (data as HabitWithLogs[]).map((habit) => {
        const streak = calculateStreak(habit,habit.HabitLog || []);
        return { ...habit, streak };
      });

      setHabits(enrichedHabits);

      //setHabits(data);
      setTotalHabits(count || 0);
      //console.log("Hook Habits: ",data);
      console.log("Hook Habits: ", enrichedHabits);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHabits(); // example: sort by name ascending

    const handleHabitsUpdated = () => {
      //console.log("Habit created event detected");
      fetchHabits();
    };
    const handleHabitLogged = () => {
      //console.log("Habit created event detected");
      fetchHabits();
    };

    window.addEventListener("habits-updated", handleHabitsUpdated);
    window.addEventListener("habit-logged", handleHabitLogged);

    return () => {
      window.removeEventListener("habits-updated", handleHabitsUpdated);
      window.removeEventListener("habit-logged", handleHabitLogged);
    };
  }, [
    sortOrder,
    limit,
    pageNumber,
    searchTerm,
    category,
    frequency,
    selectedDate,
    completed,
  ]);

  return { habits, loading, error, totalHabits, fetchHabits };
};

"use client";
import { useState, useEffect } from "react";
//import { createClient } from "@/app/utils/supabase/server";
import HabitDatePicker from "../habits/habit_components/HabitDatePicker";
import { supabase } from "@/app/utils/supabase/createClient";
import { Calendar } from "lucide-react";

const HabitLogs = () => {
  // const supabase = await createClient();

  //const selectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async (date: Date | null) => {
    if (!date) return;
    setLoading(true);
    // ✅ Convert Date → "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("Habit")
      .select(
        `
        id,
        name,
        HabitLog!inner (
          id,
          date,
          completed
        )
      `
      )
      .eq("HabitLog.completed", true)
      .eq("HabitLog.date", formattedDate);

    if (error) {
      console.error("Error fetching habits:", error);
    } else {
      setHabits(data || []);
    }
    setLoading(false);
  };
  // 🪄 Fetch when date changes
  useEffect(() => {
    fetchHabits(selectedDate);
  }, [selectedDate]);

  return (
    <>
      {/* bg-lightGreyBorder */}

      <div className="border border-lightGreyBorder p-2 rounded-md w-2/4  h-2/4 flex flex-col bg-BG">
        <div className="flex justify-between mb-2 items-center ">
          <h3 className="font-semibold mb-1 text-xs">
            Habit Logs for{" "}
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "short", // e.g. Mon
              month: "short", // e.g. Nov
              day: "numeric", // e.g. 3
              year: "numeric", // e.g. 2025 ✅
            })}
          </h3>{" "}
          <HabitDatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className="overflow-y-auto">
          {habits?.length ? (
            <ul className="space-y-2">
              {habits.map((habit) => (
                <li
                  key={habit.id}
                  className=" rounded p-1 border border-lightGreyBorder"
                >
                  <p className="font-medium text-xs">{habit.name}</p>
                  <p className="text-xs text-gray-500">
                    ✅ Completed on: {habit.HabitLog[0].date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center bg-iconHoverBG justify-center p-3 rounded-full mb-1">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                No habit data for this date
              </p>
            </div>
            // <p className="opacity-40 text-center text-xs">No habit logs found for this date.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HabitLogs;

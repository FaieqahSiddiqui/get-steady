import React from "react";
import { CircleCheckBig } from "lucide-react";
import { supabase } from "@/app/utils/supabase/createClient";
import { Habit } from "@/app/constants/types";
import { toast } from "react-toastify";

type HabitLogProps = {
  habit: Habit | null;
  selectedDate: Date | null;
  isLogged: boolean;
};
const LogHabit = ({ habit, selectedDate, isLogged }: HabitLogProps) => {
  const handleHabitLog = async () => {
    try {
      console.log("isLogged in Log habit: ", isLogged);
      if (!habit || !selectedDate) return;

      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData.user) {
        toast.error("You must be logged in to proceed");
        return;
      }
      const user = userData.user;
      //const dateString = selectedDate.toLocaleDateString("en-CA");
      const dateString = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

      //1. check current state
      const { data: existing, error: fetchError } = await supabase
        .from("HabitLog")
        .select("id, completed")
        .eq("habit_id", habit.id)
        .eq("user", user.id)
        .eq("date", dateString)
        .maybeSingle();

      if (fetchError) throw fetchError;

      //2 Upsert Log(insert or update)

      const { error: upsertError } = await supabase.from("HabitLog").upsert(
        [
          {
            //id:existing?.id, //if log exists, update it
            habit_id: habit.id,
            user: user.id,
            date: dateString,
            completed: existing ? !existing.completed : true,
          },
        ],
        { onConflict: "habit_id, user, date" }
      );

      //Dispatch a custom event
      window.dispatchEvent(new Event("habit-logged"));

      if (upsertError) throw upsertError;

      toast.success(
        existing
          ? `Habit marked as ${
              !existing.completed ? "completed" : "not completed"
            }`
          : "Habit Logged successfully!"
      );
    } catch (err: any) {
      toast.error("Unexpected error: " + err.message);
    }
  };
  return (
    <CircleCheckBig
      className={`size-5 stroke-1 hover:stroke-2 cursor-pointer ${
        isLogged ? "text-green-500" : "text-greyText"
      }`}
      onClick={handleHabitLog}
    />
  );
};

export default LogHabit;

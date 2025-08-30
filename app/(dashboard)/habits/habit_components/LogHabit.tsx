import React from "react";
import { CircleCheckBig } from "lucide-react";
import { supabase } from "@/app/utils/supabase/createClient";
import { Habit } from "@/app/constants/types";



type HabitLogProps={
    habit:Habit|null;
    selectedDate: Date|null;

}
const LogHabit = ({habit,selectedDate}:HabitLogProps) => {


// const handleDelete = async () => {
//     if (!habit) return;

//     setLoading(true);
//     const { error } = await supabase
//       .from("Habit")
//       .delete()
//       .eq("id", habit.id); // 👈 delete where id equals habit.id

//     setLoading(false);

//     if (error) {
//       // console.error("Failed to delete habit:", error.message);
//       // alert("Error deleting habit.");
//       toast.error("Error deleting habit: "+ error.message)
//       return
//     } else {
//       toast.success("Habit deleted successfully!");
//       //console.log("Habit deleted successfully");
//       onClose();

//       // Optionally dispatch an event so HabitGrid can refresh
//       window.dispatchEvent(new Event("habits-updated"));
//     }
//   };



//  const {data, error} =await supabase.from("Habit").insert([
//         { name: habitName, category, frequency },
//       ]);

//       if(error){
//         toast.error("Failed to create habit: "+ error.message)
//         return
//         //console.error("Error creating habit:", error.message);
//       }
//       else{
//         //console.log("Habit Created: ", data);
//         toast.success("Habit created successfully!");
//       }

    const handleHabitLog=async()=>{
        if (!habit) return;
        const {data, error} = await supabase.from("HabitLog").insert([
            {habit:habit, complete:true, date:selectedDate }
        ])



    }
  return (
    <CircleCheckBig className="size-5 stroke-1 hover:stroke-2 text-greyText  cursor-pointer" />
  );
};

export default LogHabit;

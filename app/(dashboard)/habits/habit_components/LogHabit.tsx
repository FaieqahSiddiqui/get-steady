import React from "react";
import { CircleCheckBig } from "lucide-react";
import { supabase } from "@/app/utils/supabase/createClient";
import { Habit } from "@/app/constants/types";
import { toast } from "react-toastify";




type HabitLogProps={
    habit:Habit|null;
    selectedDate: Date|null;
    isLogged: boolean;

}
const LogHabit = ({habit,selectedDate,isLogged}:HabitLogProps) => {


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
        // if (!habit) return;
        // const {data, error} = await supabase.from("HabitLog").insert([
        //     {habit_id:habit.id, completed:true, date:selectedDate },
        // ]);

        // if(error){
        //     toast.error("Failed to log habit: "+ error.message);
        //     return
        // }
        // else{
        //     toast.success("Habit Logged successfully!");
        // }



        try{
            if(!habit || !selectedDate) return;

            const {data: userData, error: userError} = await supabase.auth.getUser();
            if(userError || !userData.user){
                toast.error("You must be logged in to proceed");
                return;
            }
            const user = userData.user;
            //const dateString = selectedDate.toLocaleDateString("en-CA"); 
            const dateString = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"



            //1. check current state
            const {data:existing, error: fetchError} = await supabase
            .from("HabitLog")
            .select("id, completed")
            .eq("habit_id", habit.id)
            .eq("user", user.id)
            .eq("date", dateString)
            .maybeSingle();


            if (fetchError) throw fetchError;

            //2 Upsert Log(insert or update)

            const {error:upsertError} = await supabase
            .from("HabitLog")
            .upsert([
                {
                  //id:existing?.id, //if log exists, update it   
                  habit_id: habit.id,
                  user: user.id,
                  date: dateString,
                  completed: existing? !existing.completed:true,
                },
            ],
            {onConflict: "habit_id, user, date"}

            );

            //Dispatch a custom event
    window.dispatchEvent(new Event("habit-logged"));

            if(upsertError) throw upsertError;

            toast.success(
                existing ?`Habit marked as ${!existing.completed ? "completed" : "not completed"}`: "Habit Logged successfully!"
                
            );

        }
        catch(err:any){
            toast.error("Unexpected error: "+ err.message);
        }

    }
  return (
    <CircleCheckBig className={`size-5 stroke-1 hover:stroke-2 cursor-pointer ${isLogged ? "text-green-500" : "text-greyText"}`}
    onClick={handleHabitLog}/>
  );
};

export default LogHabit;

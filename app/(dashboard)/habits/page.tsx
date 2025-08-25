import React from "react";
import { Rocket, Sparkles, EllipsisVertical } from "lucide-react";
import NewHabitButton from "./habit_components/NewHabitButton";
import HabitSearchbar from "./habit_components/HabitSearchbar";
import HabitsGrid from "./habit_components/HabitsGrid";


const page = () => {
  

  return (
    <div className="border-4 border-amber-300 mb-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 border border-red-500">
        <div>
          <h3 className="text-xl font-semibold">Habits</h3>
          <p className="text-sm text-greyText">
            Build and track your daily habits
          </p>
        </div>

        <NewHabitButton buttonText="New Habit" variant="primary" />
      </div>

      
      <HabitsGrid />
       

    </div>
  );
};

export default page;

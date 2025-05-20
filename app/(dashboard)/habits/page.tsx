import React from "react";
import {Rocket, Sparkles } from "lucide-react";
import NewHabitButton from "./habit_components/NewHabitButton";

const page = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Habits</h3>
          <p className="text-sm text-greyText">
            Build and track your daily habits
          </p>
        </div>

        <NewHabitButton />
      </div>

      {/* Filter, Tabs & Search */}
      {/* <div className="flex border border-lightGreyBorder rounded-lg  p-5">
        <div></div>
      </div> */}

      {/* Habit Empty State */}
      <div className="border border-lightGreyBorder bg-iconColor/10 p-12 rounded-lg">

          <div>
            <Rocket className="size-15 stroke-1 text-primaryBlue"></Rocket>
            
          </div>

        <h3 className="font-medium text-lg">Create your First Habit</h3>
        <p className="text-sm text-greyText">Star by creating a habit that aligns with your desired identity</p>
      </div>
    </div>
  );
};

export default page;

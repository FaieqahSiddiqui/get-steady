"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import HabitFormModal from "./HabitFormModal";

type ButtonProps={
  buttonText:string;
  variant: 'primary'|'secondary';
}

const NewHabitButton = ({buttonText, variant }: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="flex flex-col items-center justify-center ">
      <button
        onClick={() => {setIsOpen(!isOpen);
          console.log("Current val of isOpen:",isOpen)
        }}
        // className="flex justify-center items-center h-fit gap-2 px-4 py-2 rounded-lg transition-all text-white bg-primaryBlue hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        className={`flex justify-center items-center h-fit gap-2 cursor-pointer
          ${variant === 'primary'  && 'px-4 py-2 rounded-lg transition-all text-white bg-primaryBlue hover:shadow-lg hover:-translate-y-0.5'}
          ${variant === 'secondary'  && 'text-blue-500 hover:underline'}`}

      >
        <Plus className="w-4 h-4" /> {buttonText}
      </button>

        <HabitFormModal isOpen={isOpen} onClose={() => {setIsOpen(false);     
                }} initialHabit={null}></HabitFormModal>

   
    
    </div>
  );
};

export default NewHabitButton;

import React, { useRef, useState, useEffect } from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Habit } from "../../../constants/types";

type HabitEllipsesProps = {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};
const HabitEllipsesMenu = ({ habit, onEdit, onDelete }: HabitEllipsesProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); //Creating a ref to track the menu element


  //Adding a useEffect that runs once to listen for clicks outside the menu
  useEffect(()=>{
    const handleClickOutside = (event:MouseEvent) =>{
       if(menuRef.current && !menuRef.current.contains(event.target as Node)){
        setOpenMenu(false); //Close the menu
       }
    };

    document.addEventListener("mousedown", handleClickOutside); //Listen for clicks
    
    //Cleanup 
    return ()=>{
        document.removeEventListener("mousedown",handleClickOutside);
    }

  },[]);

  return (
    <div ref={menuRef} className="relative inline-block self-center border  border-green-600">
      <button
        className=" rounded-full flex items-center justify-center" //peer
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <EllipsisVertical className=" size-4 " />
      </button>

      {/* Drop down when ellipses are focused */}

      {openMenu && (
        <div className="absolute right-0 mt-2 p-1  w-36 rounded-md border border-lightGreyBorder bg-BG shadow-md z-10 ">
          {/* /hidden peer-focus:block */}

        {/* Edit Button */}
          <button
            className="flex items-center gap-2 w-full rounded-sm px-2 py-1 text-left text-sm hover:bg-lightGreyBorder/70"
            onClick={() => {onEdit(habit); setOpenMenu(false);}}
          >
            <Pencil size={15} />
            Edit Habit
          </button>

        {/* Delete Button */}
          <button
            className="flex items-center gap-2 w-full rounded-sm px-2 py-1 text-left text-sm hover:bg-lightGreyBorder/60 text-red-500"
            onClick={() => {onDelete(habit); setOpenMenu(false)}}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}

      
    </div>
  );
};

export default HabitEllipsesMenu;

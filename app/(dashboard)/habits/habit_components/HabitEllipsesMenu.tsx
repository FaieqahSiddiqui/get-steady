import React, { useRef, useState, useEffect } from "react";
import { EllipsisVertical, Ellipsis, Pencil, Trash2, PenSquare } from "lucide-react";
import { Habit } from "../../../constants/types";

type HabitEllipsesProps = {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  orientation?: "vertical" | "horizontal"; //optional prop
};
const HabitEllipsesMenu = ({
  habit,
  onEdit,
  onDelete,
  orientation = "vertical",
}: HabitEllipsesProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); //Creating a ref to track the menu element

  //Adding a useEffect that runs once to listen for clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false); //Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside); //Listen for clicks

    //Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative inline-block self-center"
    >
      <button
        className=" rounded-full flex items-center justify-center" //peer
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {orientation === "vertical" ? (
          <EllipsisVertical className="size-5 stroke-1 hover:stroke-2 text-greyText  cursor-pointer" />
        ) : (
          <Ellipsis className="size-5 stroke-1 hover:stroke-2 text-greyText  cursor-pointer" />
        )}
      </button>

      {/* Drop down when ellipses are focused */}

      {openMenu && (
        <div className="absolute right-0 mt-2 p-1  w-36 rounded-md border border-lightGreyBorder bg-BG shadow-md z-10 ">
          {/* /hidden peer-focus:block */}

          {/* Edit Button */}
          <button
            className="flex items-center gap-2 w-full rounded-sm px-2 py-1 cursor-pointer text-left text-sm hover:bg-lightGreyBorder/70"
            onClick={() => {
              onEdit(habit);
              setOpenMenu(false);
            }}
          >
            <PenSquare className="size-4 text-greyText cursor-pointer" />
            Edit Habit
          </button>

          {/* Delete Button */}
          <button
            className="flex items-center gap-2 w-full rounded-sm px-2 py-1  cursor-pointer text-left text-sm hover:bg-lightGreyBorder/60 text-red-600"
            onClick={() => {
              onDelete(habit);
              setOpenMenu(false);
            }}
          >
            <Trash2  className="size-4 cursor-pointer"/>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitEllipsesMenu;

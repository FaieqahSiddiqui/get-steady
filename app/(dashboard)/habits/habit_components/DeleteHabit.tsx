import { useState } from "react";
import { Habit } from "../../../constants/types";
import { toast } from "react-toastify";
import { supabase } from "../../../utils/supabase/createClient";
//import { createClient } from "@/supabase/clients";


type DeleteHabitProps = {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit | null;
};

const DeleteHabit = ({ isOpen, onClose, habit }: DeleteHabitProps) => {
  if (!isOpen || !habit) return null;
  const [loading, setLoading] = useState(false);

  //Creating Supabase Client
  //const supabase = createClient();


  const handleDelete = async () => {
    if (!habit) return;

    setLoading(true);
    const { error } = await supabase
      .from("Habit")
      .delete()
      .eq("id", habit.id); // 👈 delete where id equals habit.id

    setLoading(false);

    if (error) {
      toast.error("Error deleting habit: " + error.message);
      return;
    } else {
      toast.success("Habit deleted successfully!");
      onClose();

      // Refresh habits in the UI
      window.dispatchEvent(new Event("habits-updated"));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="bg-BG p-6 border border-lightGreyBorder rounded-lg shadow-lg w-full max-w-md transform transition-all duration-200 scale-95"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <h2 className="text-xl font-bold text-foreground mb-2">Delete Habit</h2>
        <p className="text-greyText">
          Are you sure you want to delete this habit? This action cannot be undone.
        </p>
        <p className="font-semibold text-red-600">{habit.name}</p>

        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-auto text-white rounded-md transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHabit;

import {useState} from 'react'
import { Habit } from "../../../constants/types";
//import { createClient } from "@/supabase/clients";
import {toast} from 'react-toastify';
import {supabase} from "../../../utils/supabase/createClient";


type DeleteHabitProps = {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit|null;
};

const DeleteHabit = ({isOpen, onClose, habit}: DeleteHabitProps) => {

  if (!isOpen || !habit ) return null;
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
      // console.error("Failed to delete habit:", error.message);
      // alert("Error deleting habit.");
      toast.error("Error deleting habit: "+ error.message)
      return
    } else {
      toast.success("Habit deleted successfully!");
      //console.log("Habit deleted successfully");
      onClose();

      // Optionally dispatch an event so HabitGrid can refresh
      window.dispatchEvent(new Event("habits-updated"));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded shadow"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <p>Are you sure you want to delete this habit?</p>
        <p>{habit.name}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            // onClick={() => {
            //   console.log('Delete logic goes here');
            //     handleDelete()
            //   //onClose();
            // }}
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHabit
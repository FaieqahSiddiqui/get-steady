import {useState, useEffect} from 'react'
import { Habit } from '@/app/constants/types'
import { createClient } from "@/supabase/clients";
import { Plus, X } from "lucide-react";
import { toast } from 'react-toastify';



type HabitFormModalProps={
  isOpen: boolean;
  onClose: () => void;
  initialHabit: Habit|null;
}

const HabitFormModal = ({isOpen,onClose, initialHabit}:HabitFormModalProps) => {

  const [habitName, setHabitName]=useState(initialHabit?.name || "");
  const [category, setCategory] = useState(initialHabit?.category || "Study");
  const [frequency, setFrequency] = useState(initialHabit?.frequency || "Daily");


  if(process.env.NODE_ENV==='development'){
  console.log("Selected habit",initialHabit)
  console.log(" habit Name",habitName)
  console.log("isOpen",isOpen)
  }
 
  const defaultCategories = ["Study", "Health", "Learning", "Other"];
  const habitFrequency = ["Daily", "Weekly", "Monthly"];

//Creating Supabase Client
  const supabase = createClient();
  
  const isEdit = !!initialHabit;


useEffect(() => {
  if (initialHabit) {
    setHabitName(initialHabit.name);
    setCategory(initialHabit.category);
    setFrequency(initialHabit.frequency);
  } else {
    setHabitName("");
    setCategory("Study");
    setFrequency("Daily");
  }
}, [initialHabit]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
    if (isEdit) {
      const {data,error} = await supabase.from("Habit").update({
        name: habitName, //explicit mapping as key name is differnt from variable
        category, // shorthand for category(column_name): category(variable)
        frequency, // shorthand for frequency: frequency
      }).eq("id", initialHabit!.id);

      if(error){
          toast.error("Failed to update habit: " + error.message);
        return; // don’t close the modal if error
        //console.error("Error editing habit:", error.message);
      }
      else{
        //console.log("Habit Edited: ", data);
        toast.success("Habit updated successfully!");
      }
    } 
    else 
    {
      const {data, error} =await supabase.from("Habit").insert([
        { name: habitName, category, frequency },
      ]);

      if(error){
        toast.error("Failed to create habit: "+ error.message)
        return
        //console.error("Error creating habit:", error.message);
      }
      else{
        //console.log("Habit Created: ", data);
        toast.success("Habit created successfully!");
      }
    }
   

    //Dispatch a custom event
    window.dispatchEvent(new Event("habits-updated"));
    
      setHabitName(""); // reset form
      setCategory("Study");
      setFrequency("Daily");
    onClose();
  }
  catch(err){
    toast.error("Unexpected error occurred" + err);
    //console.error(err);
  }
  };


  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50  flex items-center justify-center">
          <div className="bg-BG rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e)=>e.stopPropagation()}>
            {/* Popup header */}
            <div className="flex justify-between mb-6">
              <h3 className="font-medium text-xl"> 
                {isEdit ? "Edit Habit" : "Create New Habit"}
              </h3>

            {/* Close Button */}
              <button
                onClick={onClose}
                className=" p-1 rounded-md hover:bg-iconHoverBG transition-colors cursor-pointer"
              >
                <X className="size-5"></X>
              </button>
            </div>

            {/* Popup Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Habit Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 ">
                  Habit Name
                </label>
                <input
                  type="text"
                  name= 'habitName'
                  value = {habitName}
                  onChange={(e)=> setHabitName(e.target.value)}
                  placeholder="Enter habit name"
                  required
                  className="w-full border border-lightGreyBorder bg-lightGreyBorder/30 rounded-lg py-2 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                ></input>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2 ">
                  Category
                </label>
                <select  name='category' value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border border-lightGreyBorder rounded-lg py-2 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-lightGreyBorder/30 h-[42px]">
                  {defaultCategories.map((cat, index) => (
                    <option key={index} value={cat} className="bg-BG">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-semibold mb-2 ">
                  Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {habitFrequency.map((f, index) => (
                    <button
                      key={index}
                      type="button"
                      name='freq'
                      onClick={()=>{setFrequency(f); console.log("This is frequency",f); }}
                      className={`border border-lightGreyBorder px-3 py-2 text-sm rounded-lg  cursor-pointer ${frequency === f ? "bg-lightBlueBorder/50 ": " hover:bg-iconHoverBG" }`}
                    >
                      {f}
                    </button>
                
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-t border-lightGreyBorder" />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 rounded-lg hover:bg-iconHoverBG cursor-pointer" onClick={onClose}>Cancel</button>

                <button type='submit' className=" h-fit px-4 py-2 rounded-lg transition-colors text-white bg-primaryBlue hover:bg-primaryBlue/90 cursor-pointer"
                > {/*Create Habit*/}
                {isEdit ? "Save Habit" : "Create Habit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      
  );
  
}

export default HabitFormModal
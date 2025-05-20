"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";



const NewHabitButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultCategories = ["Study", "Health", "Learning", "Other"];
  const habitFrequency = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="flex flex-col items-center justify-center ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center h-fit gap-2 px-4 py-2 rounded-lg transition-all text-white bg-primaryBlue hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" /> New Habit
      </button>

      

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50  flex items-center justify-center">
          <div className="bg-BG rounded-xl p-6 w-full max-w-md shadow-xl">
            {/* Popup header */}
            <div className="flex justify-between mb-6">
              <h3 className="font-medium text-xl"> Create New Habit</h3>

              <button
                onClick={() => setIsOpen(false)}
                className=" p-1 rounded-md hover:bg-iconHoverBG transition-colors"
              >
                <X className="size-5"></X>
              </button>
            </div>

            {/* Popup fields */}
            <form className="space-y-5">
              {/* Habit Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 ">
                  Habit Name
                </label>
                <input
                  type="text"
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
                <select className="w-full border border-lightGreyBorder rounded-lg py-2 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all bg-lightGreyBorder/30 h-[42px]">
                  {defaultCategories.map((category, index) => (
                    <option key={index} value={category} className="bg-BG">
                      {category}
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
                  {habitFrequency.map((frequency, index) => (
                    <button
                      key={index}
                      type="button"
                      className="border border-lightGreyBorder px-3 py-2 text-sm rounded-lg hover:bg-iconHoverBG cursor-pointer"
                    >
                      {frequency}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-t border-lightGreyBorder" />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 rounded-lg hover:bg-iconHoverBG" onClick={()=>{setIsOpen(false)}}>Cancel</button>

                <button type='submit' className=" h-fit px-4 py-2 rounded-lg transition-colors text-white bg-primaryBlue hover:bg-primaryBlue/90 cursor-pointer"
                >Create Habit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHabitButton;

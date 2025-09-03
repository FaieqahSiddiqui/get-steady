import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Don't forget the styles
import {ChevronLeft, ChevronRight, Calendar1} from "lucide-react";



type DatePickerProps={
  selectedDate: Date|null;
  onDateChange: (date: Date|null)=> void;
}

const HabitDatePicker = ({selectedDate, onDateChange}:DatePickerProps) => {

  const goToPrevDay = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1); // Go back one day
      onDateChange(newDate);

    }
  };

  // Function to go to next day
  const goToNextDay = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1); // Go forward one day
      onDateChange(newDate);

    }
  };


  return (
  
    <div className="flex justify-center items-center">
      
        {/* Custom Navigation Arrows */}
        <div className="flex justify-between items-center gap-2">
          {/* Left arrow (previous month) */}
          <button
            onClick={goToPrevDay}
            className="text-xl font-bold text-greyText cursor-pointer"
          >
           
            <ChevronLeft/>
          </button>

          {/* DatePicker */}
          <div className='relative '>
            <DatePicker
            selected={selectedDate}
            onChange={(date) => onDateChange(date)} // Allow null in the onChange handler
            className="p-1 pl-5 border text-center border-lightGreyBorder bg-BG rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
          />

          <Calendar1 className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-greyText'/>

          </div>
          
         
          {/* Right arrow (next month) */}
          <button
            onClick={goToNextDay}
            className="text-xl font-bold text-greyText cursor-pointer"
          >
            <ChevronRight/>
          </button>
        </div>
    </div>
  )
}

export default HabitDatePicker
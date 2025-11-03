'use client'

import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



//import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
//import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardCalendar() {
   // const [date, setDate] = useState<Date | undefined>(undefined)
    const [selected, setSelected] = React.useState<Date | undefined>(new Date());


    // const [dropdown, setDropdown] =
    // React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
    //   "dropdown"
    // )


    const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  // 🟡 Example condition: highlight these dates
  const highlightedDays = [10, 15]; // You can make this dynamic

  //  Convert them into real Date objects for this month
  const highlightDates = highlightedDays.map(
    (day) =>
      new Date(
        date?.getFullYear() || new Date().getFullYear(),
        date?.getMonth() || new Date().getMonth(),
        day
      )
  );

  return (





<div className="flex flex-col gap-4 w-full ">
      {/* <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        captionLayout= "dropdown"
        className="rounded-lg border shadow-sm w-52"

        modifiers={{
        highlight: highlightDates, // 👈 name your modifier
      }}
      modifiersClassNames={{
        highlight: "bg-purple-100 text-purple-700 font-semibold rounded-md", // 👈 Tailwind style for highlighted cells
      }}
      /> */}
      

     <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="
    my-calendar
    rounded-lg 
  "
  classNames={{
    day_today: "text-foreground bg-transparent font-normal",
    day_selected: "bg-primary text-primary-foreground rounded-full",
    
  }}
  buttonVariant="ghost"
/>

    </div>

















// [--cell-size:2.5rem]       /* base size for small screens */
//     sm:[--cell-size:2.5rem] /* slightly larger on small+ */
//     md:[--cell-size:2.5rem]  /* larger on medium+ */
//     lg:[--cell-size:2.7rem] /* largest on wide screens */




    // <Calendar
    //     mode="single"
    //     selected={date}
    //     onSelect={setDate}
    //     className="rounded-md border shadow"
    //     classNames={{
    //       months: "flex flex-col space-y-4",
    //       month: "space-y-4",
    //       caption: "flex justify-center pt-1 relative items-center",
    //       caption_label: "text-sm font-medium",
    //       nav: "space-x-1 flex items-center",
    //       nav_button:
    //         "h-4 w-4 bg-transparent p-0 opacity-50 hover:opacity-100",
    //       table: "w-full border-collapse space-y-1",
    //       head_row: "flex",
    //       head_cell:
    //         "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    //       row: "flex w-full mt-1",
    //       day: [
    //         // 👇 This is where the fix happens
    //         "w-12 h-4 shrink-0", // fixed width & height
    //         "flex items-center justify-center",
    //         "rounded-md text-sm transition-colors",
    //         "hover:bg-accent hover:text-accent-foreground",
    //         "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    //         "aria-selected:bg-primary aria-selected:text-primary-foreground",
    //         "aspect-auto !aspect-auto", // 👈 ensure Tailwind’s aspect-square loses
    //         "[&:hover]:w-12 [&:hover]:h-4", // 👈 lock hover size
    //         "[&[aria-selected='true']]:w-12 [&[aria-selected='true']]:h-4", // lock selected size
    //       ].join(" "),
    //       day_outside: "text-muted-foreground opacity-50",
    //       day_disabled: "text-muted-foreground opacity-50",
    //       day_today: "font-semibold underline",
    //     }}
    //   />


    //    <Calendar
    //   mode="single"
    //   selected={date}
    //   onSelect={setDate}
    //   className="rounded-md border shadow"
    //   classNames={{
    //     // Months container
    //     months: "flex flex-col space-y-4",
    //     month: "space-y-4",

    //     // Header (month title and nav)
    //     caption: "flex justify-center pt-1 relative items-center",
    //     caption_label: "text-sm font-medium",
    //     nav: "space-x-1 flex items-center",
    //     nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",

    //     // Weekday header
    //     //head_row: "w-full", // full table row
    //     //head_cell: "text-center text-muted-foreground font-normal text-[0.8rem]",

    //     // Month grid (days)
    //     month_grid: "grid gap-x-2 gap-y-1", 

    //     // Each day
    //     day: [
    //       "[&>button]:w-12 [&>button]:h-6 [&>button]:aspect-auto", 
    //       "flex items-center justify-center",
    //       "rounded-md text-sm transition-colors",
    //       "hover:bg-accent hover:text-accent-foreground",
    //       "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    //       "aria-selected:bg-primary aria-selected:text-primary-foreground",
    //     ].join(" "),

    //     day_outside: "text-muted-foreground opacity-50",
    //     day_disabled: "text-muted-foreground opacity-50",
    //     day_today: "font-semibold underline",
    //   }}
    // />


//BEST ONE

//    <Calendar
//   mode="single"
//   selected={date}
//   onSelect={setDate}
//   className="rounded-md border shadow"
//   classNames={{
//     // Months container
//     months: "flex flex-col space-y-4",
//     month: "space-y-4",

//     // Header (month title and nav)
//     caption: "flex justify-center pt-1 relative items-center",
//     caption_label: "text-sm font-medium",
//     nav: "space-x-1 flex items-center",
//     nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",

//     // Weekday header
//     //head_row: "w-full border",
//    // head_cell: "text-center mx-1 text-muted-foreground font-normal text-[0.8rem] border",

//     // Month grid (days)
//     month_grid: "w-full table-fixed border-collapse border",

//     // Each day
//     day: [
//       "flex items-center justify-center mx-1 border", // <- add horizontal padding
//       "[&>button]:w-8 [&>button]:h-6 [&>button]:aspect-auto",
//       "rounded-md text-sm transition-colors",
//       "hover:bg-accent hover:text-accent-foreground",
//       "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//       "aria-selected:bg-primary aria-selected:text-primary-foreground",
//     ].join(" "),

//     day_outside: "text-muted-foreground opacity-50",
//     day_disabled: "text-muted-foreground opacity-50",
//     day_today: "font-semibold underline",
//   }}
// />


//    <Calendar
//   mode="single"
//   selected={date}
//   onSelect={setDate}
//   captionLayout='dropdown'
//   navLayout = {"around"}
//   className="rounded-md border shadow"
//   classNames={{
//     // Months container
//     months: "flex flex-col space-y-4",
//     month: "space-y-4",

//     // Header (month title and nav)
//     caption: "flex justify-center pt-1 relative items-center ",
//     caption_label: "text-sm font-medium ",
//     nav: "space-x-1 flex items-center border border-red-600 ",
//     nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 border",

//     // Weekday header
//     //head_row: "w-full border",
//    // head_cell: "text-center mx-1 text-muted-foreground font-normal text-[0.8rem] border",

//     // Month grid (days)
//     month_grid: "w-full table-fixed border-collapse border",

//     // Each day
//     day: [
//       "flex items-center justify-center mx-0.5 border", // <- add horizontal padding
//       "[&>button]:w-8 [&>button]:h-6 [&>button]:aspect-auto",
//       "rounded-md text-sm transition-colors",
//       "hover:bg-accent hover:text-accent-foreground",
//       "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//       "aria-selected:bg-primary aria-selected:text-primary-foreground",
//     ].join(" "),

//     day_outside: "text-muted-foreground opacity-50",
//     day_disabled: "text-muted-foreground opacity-50",
//     day_today: "font-semibold underline",



//     dropdowns: "flex justify-center gap-2 mt-2 text-sm border",
//         dropdown_root:
//           "relative border rounded-md shadow-sm bg-background px-2 py-1 hover:border-primary focus:border-primary transition",
//   }}

  
// />




//  <Calendar
//   mode="single"
//   selected={date}
//   onSelect={setDate}
//   captionLayout='dropdown'
//   navLayout = "around"
//   className="rounded-md border shadow w-"
//   classNames={{
//     // Months container
//     months: "flex flex-col space-y-4 ",
//     month: "space-y-4",

//     // Header (month title and nav)
//     caption: "flex justify-between items-center border px-4",
//     caption_label: "text-sm font-medium ",
//     nav: " flex items-center border border-red-600 border order-1",
//     nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 border",

//     // Weekday header
//     //head_row: "w-full border",
//    // head_cell: "text-center mx-1 text-muted-foreground font-normal text-[0.8rem] border",

//     // Month grid (days)
//     month_grid: "w-full table-fixed border-collapse border",

//     // Each day
//     day: [
//       "flex items-center justify-center mx-0.5 border", // <- add horizontal padding
//       "[&>button]:w-8 [&>button]:h-6 [&>button]:aspect-auto",
//       "rounded-md text-sm transition-colors",
//       "hover:bg-accent hover:text-accent-foreground",
//       "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//       "aria-selected:bg-primary aria-selected:text-primary-foreground",
//     ].join(" "),

//     day_outside: "text-muted-foreground opacity-50",
//     day_disabled: "text-muted-foreground opacity-50",
//     day_today: "font-semibold underline",



//     // dropdowns: "flex justify-center gap-2 mt-2 text-sm border w-[40px] order-2",
//     //     dropdown_root:
//     //       "relative border rounded-md shadow-sm bg-background px-2 py-1 hover:border-primary focus:border-primary transition w-[40px]",

//      dropdowns: "flex items-center gap-2 order-2",

//     // 👇 key part
//     dropdown_root:
//   "relative flex items-center gap-1 border rounded-md bg-background px-2 py-1 hover:border-primary focus:border-primary transition w-28 [&>svg]:absolute [&>svg]:right-2 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2",



//     // keep the select itself invisible but clickable
//     dropdown: "absolute inset-0 opacity-0 cursor-pointer",

//   }}

  
// />



//  <div className="rounded-xl border bg-white p-4 shadow-sm w-full max-w-sm">
//       <DayPicker
//         mode="single"
//         selected={selected}
//         onSelect={setSelected}
//         showOutsideDays
//         captionLayout="label"
//         components={{
//           IconLeft: () => (
//             <ChevronLeft className="w-4 h-4 text-gray-600 hover:text-black" />
//           ),
//           IconRight: () => (
//             <ChevronRight className="w-4 h-4 text-gray-600 hover:text-black" />
//           ),
//         }}
//         classNames={{
//           root: "w-full",
//           caption: "flex items-center justify-between mb-4",
//           caption_label:
//             "text-lg font-semibold text-gray-900 tracking-tight px-2",
//           nav: "flex items-center gap-1",
//           button_previous:
//             "p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300",
//           button_next:
//             "p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300",
//           table: "w-full border-collapse text-sm",
//           head_row: "text-gray-400 font-medium",
//           head_cell: "py-2 text-center w-10",
//           row: "text-center",
//           day: "h-8 w-8 rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400",
//           day_selected:
//             "bg-purple-600 text-white font-medium hover:bg-purple-700",
//           day_today: "font-semibold text-purple-600",
//           day_outside: "text-gray-300",
//         }}
//       />
//     </div>












  );
}









//  className={`
//         w-[300px] max-w-full border rounded-md
//         [&_button]:w-6 [&_button]:h-6 [&_button]:text-[11px]
//         [&_.rdp-head_cell]:text-[10px]
//         [&_.rdp-caption_label]:text-xs

//         /* Selected date */
//         [&_.rdp-day_selected]:bg-primary/70 
//         [&_.rdp-day_selected]:text-white 
//         [&_.rdp-day_selected]:rounded-md

//         /* ✅ TODAY FIX — remove accent background completely */
//         [&_.rdp-day_today]:bg-transparent !important
//         [&_.rdp-day_today]:ring-0 
//         [&_.rdp-day_today]:outline-none
//         [&_.rdp-day_today>button]:bg-transparent !important
//         [&_.rdp-day_today>button]:ring-0 
//         [&_.rdp-day_today>button]:outline-none
//         [&_.rdp-day_today>button]:m-0 
//         [&_.rdp-day_today>button]:p-0

//         /* Optional: subtle small dot under today’s number */
//         [&_.rdp-day_today>button::after]:content-['']
//         [&_.rdp-day_today>button::after]:block
//         [&_.rdp-day_today>button::after]:mx-auto
//         [&_.rdp-day_today>button::after]:mt-[2px]
//         [&_.rdp-day_today>button::after]:w-[3px]
//         [&_.rdp-day_today>button::after]:h-[3px]
//         [&_.rdp-day_today>button::after]:rounded-full
//         [&_.rdp-day_today>button::after]:bg-primary/60
//       `}
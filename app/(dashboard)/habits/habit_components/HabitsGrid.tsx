'use client'
import {useEffect, useMemo, useState} from "react";
import { EllipsisVertical,Trash2, PenSquare, ArrowDownZA, ArrowDownAZ, Rocket, Sparkles, Loader2} from "lucide-react";
// import { createClient } from "@/supabase/server";
import { useHabits } from "@/app/hooks/useHabit";
import DeleteHabit from "./DeleteHabit";
import { Habit } from "../../../constants/types";
import HabitFormModal from "./HabitFormModal";
import HabitSearchbar from "../habit_components/HabitSearchbar";
import Paginator from "./Paginator";
import NewHabitButton from "./NewHabitButton";

//import debounce from "lodash.debounce"



const HabitsGrid = () => {
/*  const sampleHabits = [
    {
      id: "1",
      name: "Read for 30 minutes",
      description: "Read non-fiction books to expand knowledge",
      frequency: "daily",
      timeOfDay: "evening",
      streak: 5,
      progress: 80,
      category: "Learning",
      color: "blue",
      // icon: BookOpen,
      identity: {
        id: "3",
        name: "Lifelong Learner",
        description: "Someone who seeks knowledge and growth opportunities",
      },
      createdAt: new Date(),
      completedDates: [],
      completionGoal: 1,
      completionsThisPeriod: 0,
    },
    {
      id: "2",
      name: "Morning Exercise",
      description: "Start day with 20 minutes workout",
      frequency: "weekly",
      timeOfDay: "morning",
      streak: 12,
      progress: 95,
      category: "Health",
      color: "green",
      // icon: Dumbbell,
      identity: {
        id: "2",
        name: "Health Enthusiast",
        description: "Someone who prioritizes physical and mental wellbeing",
      },
      createdAt: new Date(),
      completedDates: [],
      completionGoal: 3,
      completionsThisPeriod: 2,
    },
    {
      id: "3",
      name: "Meditation",
      description: "10 minutes mindfulness practice",
      frequency: "monthly",
      timeOfDay: "morning",
      streak: 3,
      progress: 60,
      category: "Wellness",
      color: "purple",
      // icon: Brain,
      identity: {
        id: "2",
        name: "Health Enthusiast",
        description: "Someone who prioritizes physical and mental wellbeing",
      },
      createdAt: new Date(),
      completedDates: [],
      completionGoal: 8,
      completionsThisPeriod: 5,
    },
  ];
  */
  //console.log("Rendering HabitsGrid");


    const [showPopup, setShowPopup] = useState(false);
    const [showHabitModal, setShowHabitModal] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState<Habit|null>(null); 
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');  
    const [habitsPerPage, setHabitsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm]= useState("");
    


    const handleSelectChange=(e: React.ChangeEvent<HTMLSelectElement>)=>
    { 
      setHabitsPerPage(Number(e.target.value));
    }


    // const debouncedSetSearchTerm = useMemo(
    //   () =>
    //     debounce((val: string) => {
    //       setSearchTerm(val);
    //     }, 300), //wait 300ms
    //   []
    // );

    // //cleanup on unmount to avoid memory leak/ late call
    // useEffect(()=>{
    //   return () =>{
    //     debouncedSetSearchTerm.cancel();
    //   };
    // }, [debouncedSetSearchTerm]);


    const {habits, loading, error, totalHabits , fetchHabits} = useHabits('name', sortOrder, habitsPerPage, currentPage, searchTerm); //sorting
    const totalPages= Math.ceil(totalHabits/habitsPerPage);
 console.log("habits.length: ", habits.length);
 
    if (process.env.NODE_ENV === "development") {
      console.log("My Supabase habits:", habits);
      console.log("total Habits",totalHabits,
        "total Pages",totalPages,
        "habits per page",habitsPerPage);
     
    }
    
    
    

  return (
    <div className="border border-lightGreyBorder bg-BG/30  rounded-lg flex flex-col justify-center items-center">
      {/* Filter, Tabs & Search */}

      <div className="flex justify-between items-center  bg-BG/30 border  border-lightGreyBorder   py-2 px-4 mb-3 w-full">
        <div>
          {/* <HabitSearchbar searchQuery={searchTerm} onSearchChange={(val) => {debouncedSetSearchTerm(val); setCurrentPage(1);}}/> */}

          <HabitSearchbar
            searchQuery={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Setting Items per page */}
        <div className="flex gap-2 border border-pink-600">
          <label
            htmlFor="items_per_page"
            className="border border-amber-300 w-fit text-sm"
          >
            Items per page
          </label>
          <select
            name="per_page"
            id="items_per_page"
            className="border border-amber-900"
            onChange={handleSelectChange}
            value={habitsPerPage}
          >
            <option> 5</option>
            <option> 10</option>
            <option> 15</option>
            <option> 20</option>
          </select>
        </div>
      </div>

      {/* Habit Grid */}

      <div className="border grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 w-full pr-7">
        {/* Headers */}
        <div className="border border-red-500 col-span-5 flex gap-3 items-center ">
          {sortOrder === "asc" ? (
            <span title="Sort Z to A" aria-label="Sort Z to A">
              <ArrowDownZA
                className="size-4 text-iconColor cursor-pointer"
                onClick={() => setSortOrder("desc")}
              />
            </span>
          ) : (
            <span title="Sort A to Z" aria-label="Sort A to Z">
              <ArrowDownAZ
                className="size-4 text-iconColor cursor-pointer"
                onClick={() => setSortOrder("asc")}
              />
            </span>
          )}
          Habit
        </div>
        <div className="border border-red-500 col-span-2">Frequency</div>
        <div className="border border-red-500 col-span-2">Progress</div>
        <div className="border border-red-500 col-span-2">Streak</div>
        <div className="border border-red-500 col-span-1 text-center hidden md:block">
          Actions
        </div>
      </div>

      {/* Habit Rows */}

    <div className={`w-full h-[50vh] ${loading || totalHabits===0 ? "overflow-hidden" : "overflow-auto"} `}>
        
        {/* ✅ Loading */}
        {loading && (
            <div className="flex items-center h-full justify-center  overflow-hidden ">
              {/* Loading habits... */}
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          )}
       


        {/* ✅ Empty state */}

        {!loading && totalHabits === 0 && (
          <div className="border border-lightGreyBorder bg-BG/30 p-12 rounded-lg flex flex-col justify-center items-center h-full">
            <div className="relative">
              <Rocket className="size-15 stroke-1 text-blue-500" />
              <div className="absolute -right-2 -top-2">
                <Sparkles className="size-5 text-yellow-400 animate-bounce" />
              </div>
            </div>

            <h3 className="font-medium text-lg mt-6 mb-3">
              Create your First Habit
            </h3>
            <p className="text-sm text-greyText mb-3 max-w-xs text-center">
              Start by creating a habit that aligns with your desired identity
            </p>
            <NewHabitButton buttonText="Add a Habit" variant="secondary" />
          </div>
        )}

        {/* ✅ Rows */}
        {!loading && totalHabits>0 && (
        <>
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="border grid grid-cols-12 gap-4 p-3 w-full border-b border-lightGreyBorder items-center"
          >
            <div className="border col-span-5">{habit.name}</div>
            <div className="border col-span-2">{habit.frequency}</div>
            <div className="border col-span-2">{habit.progress}%</div>
            <div className="border col-span-2">{habit.streak} days</div>
            <div className="border col-span-1 justify-end">
              {/* <EllipsisVertical className="size-5 border border-amber-300" /> */}
              <div className="flex gap-2">
                <Trash2
                  className="size-5 border border-amber-300 cursor-pointer"
                  onClick={() => {
                    setSelectedHabit(habit); // 👈 store habit
                    setShowPopup(true);
                  }}
                />
                <PenSquare
                  onClick={() => {
                    setSelectedHabit(habit);
                    setShowHabitModal(true);
                  }}
                  className="size-5 border border-amber-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
        </>)}

        {/* Pagination */}

        {totalHabits > habitsPerPage && (
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      <DeleteHabit
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        habit={selectedHabit}
      />

      <HabitFormModal
        isOpen={showHabitModal}
        onClose={() => {
          setShowHabitModal(false);
          setSelectedHabit(null);
        }}
        initialHabit={selectedHabit}
      ></HabitFormModal>
    </div>
  );
};

export default HabitsGrid;

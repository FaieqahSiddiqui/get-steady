"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Trash2,
  PenSquare,
  ArrowDownZA,
  ArrowDownAZ,
  Rocket,
  Sparkles,
  Loader2,
} from "lucide-react";
// import { createClient } from "@/supabase/server";
import { useHabits } from "@/app/hooks/useHabit";
import DeleteHabit from "./DeleteHabit";
import { Habit } from "../../../constants/types";
import HabitFormModal from "./HabitFormModal";
import HabitSearchbar from "../habit_components/HabitSearchbar";
import Paginator from "./Paginator";
import NewHabitButton from "./NewHabitButton";
import HabitEllipsesMenu from "./HabitEllipsesMenu";
import HabitDatePicker from "./HabitDatePicker";
import LogHabit from "./LogHabit";

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
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [habitsPerPage, setHabitsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [frequencyFilter, setFrequencyFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date|null>(new Date());


  const [searchTerm, setSearchTerm] = useState("");

  const defaultCategories = ["All", "Study", "Health", "Learning", "Other"];
  const defaultFrequency = ["All","Daily", "Weekly", "Monthly"];


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHabitsPerPage(Number(e.target.value));
  };

  const { habits, loading, error, totalHabits, fetchHabits } = useHabits(
    "name",
    sortOrder,
    habitsPerPage,
    currentPage,
    searchTerm,
    categoryFilter,
    frequencyFilter
  ); //sorting
  const totalPages = Math.ceil(totalHabits / habitsPerPage);
  console.log("habits.length: ", habits.length);

  if (process.env.NODE_ENV === "development") {
    console.log("My Supabase habits:", habits);
    console.log(
      "total Habits",
      totalHabits,
      "total Pages",
      totalPages,
      "habits per page",
      habitsPerPage
    );
  }

  return (
    <div className="border border-lightGreyBorder bg-BG/30 rounded-xl flex flex-col justify-center items-center h-[70vh] nm:h-[80vh] ">
      {/* Filter, Tabs & Search */}

      <div className="flex justify-between items-center bg-BG/30  p-3  w-full">
        {" "}
        {/* mb-3 border border-lightGreyBorder*/}
        <div className="w-full sm:w-64 md:w-80">
          {/* <HabitSearchbar searchQuery={searchTerm} onSearchChange={(val) => {debouncedSetSearchTerm(val); setCurrentPage(1);}}/> */}

          <HabitSearchbar
            searchQuery={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex gap-5">


          {/* Frequency Filter */}
          <div className="flex gap-2 items-center">
            <label
              htmlFor="frequency_filter"
              className="text-sm font-light text-greyText"
            >
              Frequency
            </label>
            <select
              name="frequency"
              id="frequency_filter"
              className="border border-lightGreyBorder rounded-md bg-BG px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
              onChange={(e) => setFrequencyFilter(e.target.value)}
              value={frequencyFilter}
            >
              {defaultFrequency.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>




          {/* Category Filter */}
          <div className="flex gap-2 items-center">
            <label
              htmlFor="category_filter"
              className="text-sm font-light text-greyText"
            >
              Category
            </label>
            <select
              name="category"
              id="category_filter"
              className="border border-lightGreyBorder rounded-md bg-BG px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              {defaultCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>



          

          <div className="">
            <HabitDatePicker selectedDate={selectedDate} onDateChange={setSelectedDate}></HabitDatePicker>
          </div>

        </div>
      </div>

      {/* Habit Grid */}

      <div className=" grid grid-cols-12 gap-4 py-4 px-2 border-t border-b  border-b-lightGreyBorder border-t-lightGreyBorder text-sm font-medium text-greyText w-full bg-BG pr-6 ">
        {/* Headers */}
        <div className=" col-span-5 flex gap-3 items-center font-semibold ">
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
        <div className="col-span-2 font-semibold">Frequency</div>
        <div className="col-span-2 font-semibold">Progress</div>
        <div className="col-span-2 ml-5 font-semibold">Streak</div>
        <div className="col-span-1 ml-5 font-semibold text-center hidden md:block">
          Actions
        </div>
      </div>

      {/* Habit Rows */}

      <div
        // className={`w-full h-[50vh] ${
        //   loading || totalHabits === 0 ? "overflow-hidden" : "overflow-auto"
        // } `}

        className="w-full flex-1 overflow-auto"
      >
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
        {!loading && totalHabits > 0 && (
          <>
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-12 gap-4 px-2 py-3 w-full border-b border-lightGreyBorder items-center hover:bg-lightGreyBorder/30"
              >
                <div className="flex gap-4 items-center  col-span-5 text-sm font-semibold">
                  {habit.name}

                  <div className="border border-lightGreyBorder rounded-full px-2 py-0.5 text-xs font-light bg-lightBlueBorder  h-fit text-greyText">
                    {habit.category}
                  </div>
                </div>
                <div className="col-span-2">{habit.frequency}</div>
                <div className=" col-span-2">{habit.progress}%</div>
                <div className="  flex gap-1 col-span-2 ">
                  <Flame className="size-5 text-orange-400" />
                  {habit.streak || 0} days
                </div>

                {/* Actions */}

                <div className="flex col-span-1 justify-center">
                  <div className=" flex items-center justify-center  md:hidden">
                    <HabitEllipsesMenu
                      onEdit={(habit) => {
                        setSelectedHabit(habit);
                        setShowHabitModal(true);
                      }}
                      onDelete={(habit) => {
                        setSelectedHabit(habit);
                        setShowPopup(true);
                      }}
                      habit={habit}
                    />
                  </div>
                  
                  <div className=" gap-2 hidden md:flex">

                    <LogHabit  habit={habit} selectedDate={selectedDate}/>

                    <PenSquare
                      onClick={() => {
                        setSelectedHabit(habit);
                        setShowHabitModal(true);
                      }}
                      className="size-5 stroke-1 hover:stroke-2 text-greyText  cursor-pointer"
                    />
                    <Trash2
                      className="size-5 stroke-1 hover:stroke-2 text-red-500 cursor-pointer"
                      onClick={() => {
                        setSelectedHabit(habit); // 👈 store habit
                        setShowPopup(true);
                      }}
                    />
                    
                  </div>
                </div>
              </div>
            ))}
          </>
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

      <div className="w-full relative flex items-center justify-center min-h-[48px] ">
        {/* Pagination */}

        {totalHabits > habitsPerPage && (
          <div className="p-2 ">
            <Paginator
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* Setting Items per page */}
        <div className="flex gap-2 items-center ml-auto absolute right-0 pr-4 ">
          <label
            htmlFor="items_per_page"
            className="text-sm font-light text-greyText"
          >
            Items per page
          </label>
          <select
            name="per_page"
            id="items_per_page"
            className="border border-lightGreyBorder rounded-md bg-BG px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
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
    </div>
  );
};

export default HabitsGrid;

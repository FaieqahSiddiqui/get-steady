"use client";
import { useState } from "react";
import {
  Flame,
  Trash2,
  PenSquare,
  ArrowDownZA,
  ArrowDownAZ,
  Rocket,
  Sparkles,
  Loader2
} from "lucide-react";
// import { createClient } from "@/supabase/server";
import { useHabits } from "@/app/hooks/useHabit";
import DeleteHabit from "./DeleteHabit";
import { Habit, HabitWithLogs } from "../../../constants/types";
import HabitFormModal from "./HabitFormModal";
import HabitSearchbar from "../habit_components/HabitSearchbar";
import Paginator from "./Paginator";
import NewHabitButton from "./NewHabitButton";
import HabitEllipsesMenu from "./HabitEllipsesMenu";
import HabitDatePicker from "./HabitDatePicker";
import LogHabit from "./LogHabit";
import * as Progress from "@radix-ui/react-progress";
import HabitFrequencyFilter from "./HabitFrequencyFilter";
import HabitCategoryFilter from "./HabitCategoryFilter";
import HabitStatusFilter from "./HabitStatusFilter";

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

  const defaultCategories = ["All", "Study", "Health", "Learning", "Other"];
  const defaultFrequency = ["All", "Daily", "Weekly", "Monthly"];
  const defaultStatuses = [
    { label: "All", value: null },
    { label: "Completed", value: true },
    { label: "Incomplete", value: false },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [habitsPerPage, setHabitsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [frequencyFilter, setFrequencyFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [habitStatusFilter, setHabitStatusFilter] = useState(
    defaultStatuses[0]
  );

  const [searchTerm, setSearchTerm] = useState("");

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
    frequencyFilter,
    selectedDate,
    habitStatusFilter.value //(null | true | false)
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
      {/* Filter & Search */}

      <div className="flex justify-between items-center bg-BG/30 p-2 w-full">
        {" "}
        {/* mb-3 border border-lightGreyBorder*/}
        <div className="w-full sm:w-64 md:w-100 mr-4">
          <HabitSearchbar
            searchQuery={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* FILTERS */}
        <div className=" flex gap-3 ">
          {/* Frequency Filter */}

          <HabitFrequencyFilter setFrequencyFilter={setFrequencyFilter} frequencyFilter={frequencyFilter} defaultFrequency={defaultFrequency}/>

          
          {/* Category Filter */}

          <HabitCategoryFilter setCategoryFilter= {setCategoryFilter} categoryFilter={categoryFilter} defaultCategories={defaultCategories}/>

          {/* Status Filter */}

          <HabitStatusFilter setHabitStatusFilter={setHabitStatusFilter} habitStatusFilter={habitStatusFilter} defaultStatuses={defaultStatuses} />
          

          <div className="">
            <HabitDatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            ></HabitDatePicker>
          </div>
        </div>
      </div>

      {/* Habit Grid */}

      <div className=" grid grid-cols-12 gap-4 py-3 px-3 border-t border-b  border-b-lightGreyBorder border-t-lightGreyBorder text-sm font-medium text-greyText w-full bg-BG pr-6 ">
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
        <div className="col-span-2 font-semibold text-sm">Frequency</div>
        <div className="col-span-2 font-semibold text-sm">Progress</div>
        <div className="col-span-2 ml-5 font-semibold text-sm">Streak</div>
        <div className="col-span-1 ml-1 font-semibold text-sm text-center hidden md:block ">
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
          <div className="flex items-center h-full justify-center overflow-hidden ">
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
            {console.log("Selected Date:", selectedDate)}

            {habits.map((habit) => {
              // const isLogged =
              //   habit.HabitLog && habit.HabitLog[0]?.completed === true;

              const isLogged = habit.HabitLog.some(
                (log) =>
                  new Date(log.date).toLocaleDateString("en-CA") ===
                    selectedDate?.toLocaleDateString("en-CA") && log.completed
              );

              return (
                <div
                  key={habit.id}
                  className="grid grid-cols-12 gap-4 px-4 py-2 w-full border-b border-lightGreyBorder items-center hover:bg-lightGreyBorder/30 "
                >
                  <div className="flex gap-4 items-center col-span-5 text-xs ">
                    {habit.name}

                    
                    <div className="border border-lightGreyBorder rounded-full px-1 py-0.5 text-[11px] font-light bg-lightBlueBorder  h-fit text-greyText">
                      {habit.category}
                    </div>
                  </div>
                  <div className="col-span-2 text-xs">{habit.frequency}</div>

                  {/* <div className=" col-span-2">{habit.progress}%</div> */}

                  <div
                    className="col-span-2 text-xs"
                    title={
                      habit.frequency === "Daily"
                        ? "Completion rate over the last 7 days"
                        : habit.frequency === "Weekly"
                        ? "Completion rate over the last 4 weeks"
                        : "Completion rate over the last 6 months"
                    }
                  >
                    {habit.progress}%
                    <Progress.Root
                    className="relative overflow-hidden bg-gray-200 rounded-full w-1/2 h-1 "
                    value={habit.progress}>

                      <Progress.ProgressIndicator className="bg-blue-500 h-full transition-transform duration-300 rounded-full" style={{ transform: `translateX(-${100 - habit.progress}%)` }}>
                        
                      </Progress.ProgressIndicator>

                    </Progress.Root>
                    {/* {habit.progress}% */}
                  </div>

                  <div className="  flex gap-1 col-span-2 text-xs items-center">
                    <Flame className= {`size-5 text-orange-400 ${habit.streak>0 ? "fill-orange-300" : ""} ` }/>
                    {habit.streak || 0}{" "}
                    {habit.frequency === "Daily"
                      ? "days"
                      : habit.frequency === "Weekly"
                      ? "weeks"
                      : "months"}
                  </div>

                  {/* Actions */}

                  <div className="flex col-span-1 justify-center items-center  ">
                    <div className=" flex items-center justify-center md:hidden">
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

                    <div className="gap-2 items-center hidden md:flex">
                      <LogHabit
                        habit={habit}
                        selectedDate={selectedDate}
                        isLogged={isLogged}
                      />

                      {/* <Ellipsis className="size-5 stroke-1 hover:stroke-2 text-greyText  cursor-pointer"/> */}

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
                        orientation="horizontal"
                      />

                      <div className="hidden">
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
                </div>
              );
            })}
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
        <div className="flex gap-2 items-center ml-auto absolute right-0 pr-4">
          <label
            htmlFor="items_per_page"
            className="text-sm font-light text-greyText"
          >
            Items per page
          </label>
          <select
            name="per_page"
            id="items_per_page"
            className="border border-lightGreyBorder rounded-md bg-BG px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500"
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

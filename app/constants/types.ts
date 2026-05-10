export type AuthView = "login" | "signup" | "forgot" | "reset";


// export const defaultHabitStatuses = [
//   { label: "All", value: null },
//   { label: "Completed", value: true },
//   { label: "Incomplete", value: false },
// ] as const;

export interface Habit {
id: string;
  name: string;
  description: string;
  frequency: string;
  timeOfDay: string;
  streak: number;
  progress: number;
  category: string;
  color: string;
  created_at: string;
  completedDates: any[]; // You can refine this
  completionGoal: number;
  completionsThisPeriod: number;
  identity: {
    id: string;
    name: string;
    description: string;
  };

}

export type HabitLog={
  id: number;
  date: Date;
  completed: boolean;
};

export interface HabitWithLogs extends Habit {
  HabitLog: HabitLog[];
};
export type AuthView = "login" | "signup" | "forgot" | "reset";

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
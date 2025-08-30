'use client'
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/clients"; // This should return the browser-side supabase client
import { Habit } from "../constants/types";

export const useHabits = (
        sortBy: keyof Habit = 'name', // default sort by name not`created_at`
        sortOrder: 'asc' | 'desc' = 'asc',   // default ascending order
        limit:number = 5,
        pageNumber:number = 1,
        searchTerm: string="",
        category: string ="",
        frequency: string=""

)=>{
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState<string | null>(null);
    const [totalHabits, setTotalHabits]= useState(0);

    console.log("useHabits hook called");


    const fetchHabits = async () =>{

      setLoading(true);
      setError(null);

        const supabase = createClient();

        //console.log("Supabase client:", supabase);
        //console.log("Habits per page in the hook: ",limit);

        const from = (pageNumber-1) * limit;
        const to = from + (limit-1)

        let query = supabase.from('Habit').select('*', {count: 'exact'}).order(sortBy, {ascending:sortOrder === 'asc'}).range(from,to);

        // Case-insensitive partial match for category
        if (category.trim() !== "" &&  category!=="All") {
          query = query.ilike('category', `%${category}%`);
        }

        // Case-insensitive partial match for category
        if (frequency.trim() !== "" &&  frequency!=="All") {
          query = query.ilike('frequency', `%${frequency}%`);
        }

        if(searchTerm.trim() !==""){
          query=query.ilike('name',`%${searchTerm}%`)
        }

        const {data,count,error}= await query;

        // const {data,count, error} = await supabase.from('Habit').select('*', {count: 'exact'}).order(sortBy, {ascending:sortOrder === 'asc'}).range(from,to);
        //range(0,limit-1)
        //const {count, error: countError} = await supabase.from('Habit').select('*',{count:'exact', head:true})

        //console.log("Supabase returned:", { data, error });

        if(error){
            //console.error(error);
            setError(error.message?? "Failed to fetch habits");
        }
        else{
            setHabits(data);
            setTotalHabits(count||0);
            //console.log("Hook Habits: ",data);
        }
        setLoading(false);
    }

    useEffect(() => {
      fetchHabits(); // example: sort by name ascending

      const handleHabitsUpdated = () => {
        //console.log("Habit created event detected");
        fetchHabits();
      };

      window.addEventListener("habits-updated", handleHabitsUpdated);

      return () => {
        window.removeEventListener("habits-updated", handleHabitsUpdated);
      };
    }, [sortOrder, limit, pageNumber, searchTerm, category, frequency]);

    return {habits, loading, error, totalHabits, fetchHabits};

}
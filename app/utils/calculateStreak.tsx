

import { HabitLog } from "../constants/types";

export function calculateStreak(habitLogs: HabitLog[], frequency: "Daily"|"Weekly"|"Monthly"="Daily"):number{
    if(!habitLogs || habitLogs.length===0) return 0;


    //Filter completed logs and map to JS Date object
    // const completedDates = habitLogs.filter((log)=>log.completed).map((log)=> new Date(log.date).toDateString());


     const completedDates = habitLogs.filter((log)=>log.completed).map((log)=> new Date(log.date). toLocaleDateString("en-CA")
);

     console.log("CompletedDates from streak function:",completedDates);

    if(completedDates.length===0) return 0;
    
    const today= new Date().toLocaleDateString("en-CA");
    //console.log("Today:",today);

    let streak = 0;

    let current= new Date();

    if(!completedDates.includes(today)){
        current.setDate(current.getDate()-1);
    }



    console.log("Current:",current);


    while(true){
        const currentStr = current.toLocaleDateString("en-CA");
        if(completedDates.includes(currentStr)){
            streak++;

            current.setDate(current.getDate()-1);
        }
        else{
            break;
        }
    }
    return streak;

}
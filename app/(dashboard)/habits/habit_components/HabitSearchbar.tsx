import React from 'react'
import {useEffect, useMemo, useState} from "react";
import {Search, CircleX} from "lucide-react";
import debounce from "lodash.debounce"



type HabitProps ={
  searchQuery:string;
  onSearchChange: (value:string)=> void
}

const HabitSearchbar = ({searchQuery, onSearchChange}:HabitProps) => {

  const [inputValue, setInputValue] = useState(searchQuery);


  //Debounce the callback
  const debouncedOnChange = useMemo(
    ()=> debounce((val:string)=> onSearchChange(val),300),
    [onSearchChange]
  );

  //cleanup
  useEffect(()=>{
    return ()=>{
      debouncedOnChange.cancel();

    };
  }, [debouncedOnChange])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const val = e.target.value;
    setInputValue(val);
    debouncedOnChange(val);
  }

  const handleClear=()=>{
    setInputValue("");
    debouncedOnChange("");
  }

  return (
    <div className="relative w-full rounded-md">
      <Search className="absolute size-4 text-greyText left-2 top-1/2 -translate-y-1/2" /> 
      {/*flex items-center rounded-md -mr-6 z-1 w-sm*/}
      <input
        type="text"
        aria-label="Search habits"
        //value ={searchQuery}
        //onChange={(e)=>onSearchChange(e.target.value)}
        value = {inputValue}
        onChange={handleChange}
        placeholder="Search habits..."
        className="border border-lightGreyBorder text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 pl-8 pr-8 py-1.5 rounded-md bg-iconHoverBG"
      />
      {inputValue &&
      <CircleX 
      onClick={handleClear}
      className='absolute size-4 text-greyText/50 right-2 top-1/2 -translate-y-1/2 cursor-pointer'/>}

    </div>
  );
}

export default HabitSearchbar




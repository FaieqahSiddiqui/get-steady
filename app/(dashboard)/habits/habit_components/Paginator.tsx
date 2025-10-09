import React from 'react'
import {ChevronLeft, ChevronRight} from "lucide-react";


type paginatorProps={
    totalPages:number,
    currentPage: number,
    onPageChange:(page:number)=>void,
    windowSize?: number

}
const Paginator = ({totalPages, currentPage, onPageChange,windowSize=5}:paginatorProps) => {

    //figure out which "window we are in

    const windowIndex = Math.floor((currentPage -1)/windowSize);

    const start = (windowIndex * windowSize)+1;
    const end = Math.min((start + windowSize) -1, totalPages);
    const pages =[];
    for(let i= start; i<=end; i++){
        pages.push(i);
    }




  return (
    //<div>Paginator</div>
    <div className='flex justify-center items-center'>
       
        {/* Page numbers */}

        <button
            onClick={()=>onPageChange(Math.max(currentPage-1, 1))}
            disabled={currentPage===1}
            className='border-1 text-sm border-lightGreyBorder rounded-md py-1 px-2 mr-2 cursor-pointer'
        
        > 
        <div className="flex gap-1 items-center justify-center pr-1.5">
             <ChevronLeft size={16} className=''/> Previous
        </div>
        
        </button>


        {pages.map((page)=>(
            <button 
            key={page}
            onClick={()=>onPageChange(page) }
            disabled = {page===currentPage}
            className= {`text-sm py-1 px-2.5 mx-0.5 rounded-md ${page===currentPage? "bg-primaryBlue text-white ": "bg-BG hover:bg-gray-300/50 transition-colors duration-400 ease-in-out cursor-pointer"}`}
            >
            {page}
 
            </button>
        ))}

        <button
            onClick={()=>onPageChange(currentPage+1)}
            disabled={currentPage===totalPages}
            className={`border-1 text-sm border-lightGreyBorder rounded-md py-1 px-2 ml-2 cursor-pointer`}
        >
            <div className="flex gap-1 items-center justify-center pl-1.5">
             Next <ChevronRight size={16} className=''/> 
          </div>
            
            
        </button>

       
        
    </div>

  )
}

export default Paginator
import React from 'react'


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
    <div className='flex justify-center'>
       
        {/* Page numbers */}

        <button
            onClick={()=>onPageChange(Math.max(currentPage-1, 1))}
        >
            Prev
        </button>

        {pages.map((page)=>(
            <button 
            key={page}
            onClick={()=>onPageChange(page) }
            disabled = {page===currentPage}
            className= {
                `px-3 py-1 rounded ${page===currentPage? "bg-blue-600 text-white font-bold": "bg-gray-200 hover:bg-gray-300 cursor-pointer"}`
            }
            
            >
            
        

            {page}
 
            </button>
        ))}

        <button
            onClick={()=>onPageChange(currentPage+1)}
            disabled={currentPage===totalPages}
        >
            Next
        </button>

       
        
    </div>

  )
}

export default Paginator
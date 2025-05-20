'use client'
import {useState} from 'react'
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";


const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
      const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
     

    
  return (
     <div>
      <div className="flex h-screen">
        {/* user={user} */}
        <DashboardHeader
          toggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        <Sidebar isOpen={isSidebarCollapsed} />
        
        {/* Only pt-16 is needed */}
        <div className={`bg-gradient-to-b from-heroBgStart to-BG w-full pt-21 pl-4 pr-4 ${isSidebarCollapsed? 'ml-62' : 'ml-16'}  `}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutWrapper
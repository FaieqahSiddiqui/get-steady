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
        

        <div className={`bg-gradient-to-b from-heroBgStart to-BG w-full ${isSidebarCollapsed? 'ml-62' : 'ml-16'}  `}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutWrapper
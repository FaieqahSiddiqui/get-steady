"use client";
import React from "react";
import { Logo } from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User as supabaseUser } from "@supabase/auth-js"; // Import the User type from Supabase
import { Menu, User } from "lucide-react";

import { createClient } from "@/app/utils/supabase/clients";
import { useUser } from "@/app/components/UserProvider"; // adjust path as needed




type Props = {
  toggleSidebar: () => void;
  // user: supabaseUser | null;
};


//user
const DashboardHeader = ({ toggleSidebar }: Props) => {
  const pathName = usePathname();
  //console.log(user);


  //creating client user
const { user } = useUser();

console.log('USer',user)



  return (
    <header className="w-full flex justify-between fixed h-17 py-4 px-2 md:px-4  border-b border-b-lightGreyBorder bg-BG/60 backdrop-blur-md">
      <div className="mx-auto flex justify-between items-center w-full">
        <div className="flex justify-between w-50 items-center ">
          <div className="flex items-center">
            <button
              className="hover:bg-iconHoverBG rounded-lg transition-colors cursor-pointer"
              onClick={toggleSidebar}
            >
              <Menu className="h-9 w-9 p-2 text-gray-400" />
            </button>
          </div>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="flex place-items-end space-x-4">
          {pathName === "/" && (
            <Link
              href="/auth"
              className="px-4 py-2 rounded-xl bg-primaryBlue text-white font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Log In
            </Link>
          )}
          {/* User Info */}
          <div className="flex gap-3 items-center">

            <div className="flex flex-col items-end space-y-0.5">
              <span className="text-sm font-semibold">{user?.user_metadata.full_name}</span>
              <span className="text-xs text-greyText">{user?.email}</span>
            </div>

            <div className="bg-iconHoverBG shadow-sm rounded-full w-12 h-12 flex justify-center items-center hover:bg-iconHoverBG/60">
            <User className="w-6 h-6 text-iconColor"/>
            </div>
            
          </div>

          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

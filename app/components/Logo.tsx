import React from "react";
interface LogoProps {
  className?: string;
}
export const Logo = ({ className = "h-6 w-8" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Base circle */}
        <circle
          cx="16" 
          cy="16" 
          r="15" 
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600" /*previously text-blue-600*/
        />
        {/* Steady progress lines */}
        <path
          d="M8 16L13 21L24 11"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        />
      </svg>
      <div className="text-xl font-bold flex items-baseline gap-0.5">
        get<span className="text-primaryBlue">steady</span>
        <span className="text-primaryBlue font-normal text-base">.io</span>
      </div>
    </div>
  );
};

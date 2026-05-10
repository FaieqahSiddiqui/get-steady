"use client";

import React from "react";

import {
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Activity,
  UserPlus,
  Star,
  Flame
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  color:string;
  bottomText:string;
  tooltip?: string; // new

};

// 👇 each icon is a React component that accepts SVG props
type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// 👇 Make sure the value type is explicitly IconComponent
const iconMap: Record<string, IconComponent> = {
  star: Star,
  flame: Flame,
  orders: ShoppingBag,
  conversion: TrendingUp,
  sessions: Activity,
  signups: UserPlus,
};

//tailwind doesnt generate dynamic classes so we need to create a color map
const colorMap: Record<string, string> = {
  "yellow-400": "text-yellow-400",
  "yellow-500": "text-yellow-500",
};


const StatCard = ({ title, value, icon, color, bottomText, tooltip }: StatCardProps) => {
  // 👇 safe fallback to Users icon
  const Icon = iconMap[icon] ?? Users;

  return (
    <div title={tooltip} className="bg-BG/70 rounded-md shadow p-2 text-center border border-gray-100 backdrop-blur-sm ">
      
      <div className="flex gap-2 items-center border ">
        {/* Icon */}
        {/* <Icon className= {`w-4 h-4 text-${color} items-center stroke-2`} /> */}
        <Icon className={`w-4 h-4 stroke-2 ${colorMap[color]}`} />


        <p className="text-gray-500 text-sm">{title}</p>
      </div>

      {/* Value */}
      <h2 className="text-sm font-medium mt-1">
        {value}
      </h2>

      <p className="text-gray-500 text-xs border">{bottomText}</p>
    </div>
  );
};

export default StatCard;

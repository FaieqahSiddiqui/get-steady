"use client";
import { House, ClipboardList, LogOut } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";
import { signout } from "../../auth/components/actions";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
};
const navItems = [
  {
    icon: House,
    label: "Home",
    path: "/dashboard",
  },
  {
    icon: ClipboardList,
    label: "Habits",
    path: "/habits",
  },
];

const Sidebar = ({ isOpen }: Props) => {
  const pathName = usePathname();

  return (
    <aside
      //transition-[width] duration-300 ease-in-out
      className={`fixed top-17 h-screen bg-BG/20 border-r z-10 border-lightGreyBorder flex flex-col  ${
        isOpen ? "w-62" : "w-16"
      }`}
    >
      {/* Nav options */}
      <nav className="p-3 flex-1">
        <ul className={`space-y-1 flex flex-col`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center px-3 py-1 gap-3 text-gray-400  rounded-lg hover:bg-iconHoverBG transition-colors ${
                  pathName.startsWith(item.path)
                    ? "bg-iconHoverBG text-iconColor"
                    : "text-gray-400 hover:bg-iconHoverBG"
                }`}
              >
                <item.icon className="w-4 h-4  flex-shrink-0" />
                <span
                  className={`transition-[opacity,width] duration-600 ease-in-out text-greyText overflow-hidden font-medium ${
                    isOpen ? "opacity-100 max-w-xs " : "opacity-0 max-w-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <hr className="border-t border-lightGreyBorder" />

      <div className=" p-3 mb-17 space-y-0.5">
        {/* Theme Toggle */}
        <div className="flex items-center  px-1 gap-2 rounded-lg hover:bg-iconHoverBG transition-colors cursor-pointer">
          <ThemeToggle />
          <span
            className={`transition-[opacity,width] duration-300 text-greyText font-medium ${
              isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
            } overflow-hidden`}
          >
            Theme
          </span>
        </div>

        {/* Logout Button */}
        <form>
          <button
            className="flex w-full  py-1 px-3.5 gap-4 items-center rounded-lg hover:bg-iconHoverBG transition-colors cursor-pointer"
            formAction={signout}
            type="submit"
          >
            <LogOut className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span
              className={`transition-[opacity,width] duration-300 text-greyText font-medium ${
                isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
              } overflow-hidden`}
            >
              Logout
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;

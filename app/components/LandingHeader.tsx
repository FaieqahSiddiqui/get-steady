"use client";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LandingHeader = () => {
  const pathName = usePathname();

  return (
    <header className="w-full flex justify-between fixed h-17 py-4 px-4 md:px-8 z-50 border-b border-b-lightGreyBorder bg-BG/60 backdrop-blur-md">
      <div className="mx-auto flex justify-between items-center max-w-7xl w-full">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center space-x-4">
          {pathName === "/" && (
            <Link
              href="/auth"
              className="px-4 py-2 rounded-xl bg-primaryBlue text-white font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Log In
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;

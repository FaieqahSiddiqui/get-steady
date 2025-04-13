import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const LandingHeader = () => {
  return (
    <header className="w-full flex justify-between fixed h-17 py-4 px-8 z-50 border-b border-b-lightGreyBorder bg-BG/60 backdrop-blur-md">
      <Link href="/">
        <Logo />
      </Link>

      <Link href="/auth" className="border">
        Login
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default LandingHeader;

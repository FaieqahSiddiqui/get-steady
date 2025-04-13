import { Logo } from "./Logo"
import ThemeToggle from "./ThemeToggle"

const LandingHeader = () => {
  
  return (
    <div className="w-full flex justify-between fixed h-17 py-4 px-8 z-50 border-b border-b-lightGreyBorder bg-BG/60 backdrop-blur-md">
      <Logo />
      <ThemeToggle/>
    </div>
  )
}

export default LandingHeader
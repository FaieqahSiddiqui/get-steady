"use client";
import { useState } from "react";
import { Logo } from "../components/Logo";
import LandingHeader from "../components/LandingHeader";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import { AuthView } from "../constants/types";

const page = () => {
  const [activeView, setActiveView] = useState<AuthView>("login");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-heroBgStart to-BG">
      <LandingHeader />

      {/* Optional decorative overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)] " />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-26 pb-12 ">
        <div className="mb-10 transform hover:scale-105 transition-transform">
          <Logo className="h-8 w-8" />
        </div>

        {/* Form Card */}
        <div className="w-full rounded-2xl bg-BG/80 p-6 md:p-8 shadow-2xl max-w-md">
          
          {/* AuthView state change */}
          {activeView === "login" && <LoginForm changeView={setActiveView} />}
          {activeView === "signup" && <SignupForm newView={setActiveView} />}
          {activeView === "forgot" && (<ForgotPassword changeView={setActiveView} />)}
        </div>
      </div>
    </div>
  );
};

export default page;

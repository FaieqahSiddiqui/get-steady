import { Logo } from "./Logo";
import { ArrowRight, CheckCircle } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";

const LandingHero = () => {
  const benefits = [
    "Build steady  habits that last",
    "Track your daily progress consistently",
    "Achieve your goals step by step",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-b from-heroBgStart to-BG pt-28 pb-6 px-4">
      <Logo className="h-10 w-10" />

      <span className="rounded-4xl bg-heroBgStart border-1 px-4 py-1.5 my-8 border-lightBlueBorder text-sm font-semibold text-blue-500">
        Make Every Day Count
      </span>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
        Stay steady. Stay focused.
        <br />
        <span className="text-primaryBlue">Excel every day.</span>
      </h1>

      <p className="mt-6 text-lg text-greyText max-w-2xl mx-auto text-center">
        Join a growing community of early users building better habits and
        making steady progress toward their goals with GetSteady.
      </p>

      {/* [User enters email] → [Click Join] → [Validate email] → [Send to backend or database] → [Success message or error] */}

      {/* Input and button */}

      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center relative">
        <div className="absolute -left-1 -top-4 w-8 h-8 border-2 border-blue-200 rounded-lg transform rotate-12 opacity-50" />
        <div className="absolute -right-1 -bottom-6 w-12 h-12 border-2 border-blue-200  rounded-full opacity-60" />

        <WaitlistForm
          buttonClass="inline-flex items-center justify-center bg-primaryBlue text-white h-12 gap-2 px-4 font-medium rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          inputClass="px-6 py-3 w-full sm:w-80 rounded-lg border border-lightGreyBorder focus:outline focus:outline-blue-500"
          buttonText="Join the waitlist"
          outerDivClass="flex flex-col sm:flex-row gap-4 w-full justify-center"
        ></WaitlistForm>
      </div>

      {/* Benefits */}
      <div className="mt-16 flex flex-col gap-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-greyText group "
          >
            <CheckCircle className="text-green-500 w-5 h-5 transform group-hover:scale-110 transition-transform"></CheckCircle>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingHero;

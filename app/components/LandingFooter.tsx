import React from 'react'
import { WaitlistForm } from './WaitlistForm';


const LandingFooter = () => {
  
  return (
    <div className="relative w-full bg-gradient-to-br from-footerBgStart to-footerBgEnd  py-16 px-4">
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)] z-[-1]" />
      <div className="max-w-4xl mx-auto items-center text-center ">
        <div className="mb-8">
          <span className="bg-white/10 rounded-4xl py-2 px-4 w-fit text-white">
            ⭐ Join GetSteady Beta
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-white" >
          Ready to build steady habits?
        </h1>
        <p className="text-blue-100 mb-8 text-md max-w-2xl mx-auto">
          Be among the first to experience GetSteady.io and transform your habits forever.
        </p>

        {/* Email Input and Button */}

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-6 py-2 h-14 rounded-lg border border-white/20 bg-white/10 placeholder-white/60 focus:outline focus:outline-white"
          />

          <button className="inline-flex w-full sm:w-auto items-center h-14 gap-2 bg-white text-blue-600 px-6  font-medium rounded-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5 hover:shadow-lg ">
            <span>Get Early Access</span>
            <ArrowRight/>
          </button>
        </div> */}

        <WaitlistForm buttonClass='inline-flex w-full sm:w-auto items-center h-14 gap-2 bg-white text-blue-600 px-6 font-medium rounded-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer'
        inputClass='w-full px-6 py-2 h-14 rounded-lg border border-white/20 bg-white/10 placeholder-white/60 focus:outline focus:outline-white text-white' buttonText='Get Early Access' outerDivClass='flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto'></WaitlistForm>
        
      </div>
    </div>
  );
};

export default LandingFooter;

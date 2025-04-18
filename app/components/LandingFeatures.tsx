import React from "react";
import { Target, Calendar, Trophy, Clock, Users, Brain } from "lucide-react";

const LandingFeatures = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Steady Goal Setting",
      description: "Set achievable goals and track your progress consistently",
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: "Daily Tracking",
      description: "Build steady habits with our easy daily tracking system",
    },
    {
      icon: <Trophy className="w-6 h-6 text-blue-600" />,
      title: "Achievement System",
      description: "Stay motivated with rewards for consistent progress",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Time Management",
      description: "Develop steady study routines that work for you",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Social Groups",
      description: "Stay accountable with peers who share your goals",
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      title: "Progress Analytics",
      description: "Track your steady improvement with detailed insights",
    },
  ];
  return (
    <div className="w-full py-16 bg-BG ">
      <div className="max-w-7xl w-full px-4 md:px-8 flex flex-col items-center mx-auto">
        <div className="w-18 h-1 bg-primaryBlue rounded-full" />
        <h2 className="text-3xl font-bold pt-16 mb-4 max-w-lg">
          Everything you need to succeed
        </h2>
        <p className=" max-w-lg mb-16 text-center">
          Our platform combines powerful features to help you stay on track and
          achieve your goals
        </p>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-b from-BG to to-heroBgStart/60 border border-lightGreyBorder hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="transform transition-transform group-hover:scale-110 group-hover:-translate-x-1 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-greyText">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingFeatures;

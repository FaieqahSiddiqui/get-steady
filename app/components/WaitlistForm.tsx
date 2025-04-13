"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export const WaitlistForm = ({
  inputClass = "",
  buttonClass = "",
  buttonText = "",
  outerDivClass = "",
}: {
  inputClass?: string;
  buttonClass?: string;
  buttonText: string;
  outerDivClass?: string;
}) => {
  const [showMessage, setShowMessage] = useState(false);

  // Define the handleSubmit function inside the component
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // TypeScript knows it's a form
    const email = (form.elements.namedItem("email") as HTMLInputElement).value; // Get the email input value

    fetch("https://formspree.io/f/mgvadnvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }), // Send email in JSON format
    }).then((res) => {
      if (res.ok) {
        form.reset(); // Reset the form if success

        setShowMessage(true);

        // Auto-hide after 4 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      } else {
        alert("Oops! Something went wrong.");
      }
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        //   className="flex flex-col w-full items-center"
      >
        <div className={`${outerDivClass}`}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className={`${inputClass}`}
          ></input>
          <button className={`${buttonClass}`} type="submit">
            {`${buttonText}`}
            <ArrowRight />
          </button>
        </div>
        {/* Thank you message */}
        {showMessage && (
          <p className= {`text-center mt-4 ${buttonText==='Get Early Access' ? 'text-white': 'text-green-600' }`}>
            You're on the waitlist! 🎉
          </p>
        )}
      </form>
    </div>
  );
};

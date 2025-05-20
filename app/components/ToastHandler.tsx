'use client'
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const ToastHandler = () => {
  const searchParams = useSearchParams();
  const loginStatus = searchParams.get("login");
  const signupStatus = searchParams.get("signup");
  const pwUpdateStatus = searchParams.get("update");
  const toastShown = useRef(false);

  useEffect(() => {
    if (toastShown.current) return;

    if (loginStatus === "success") {
      toast.success("Login successful! 🎉");
      toastShown.current = true;
    } else if (signupStatus === "success") {
      toast.success("Account created! Welcome aboard 👋");
      toastShown.current = true;
    } else if (pwUpdateStatus === "success") {
      toast.success("Password updated successfully 🔐");
      toastShown.current = true;
    }

    if (loginStatus || signupStatus || pwUpdateStatus) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [loginStatus, signupStatus, pwUpdateStatus]);

  return null
  
};

export default ToastHandler;

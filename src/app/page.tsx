"use client";

import Link from "next/link";
import LoginForm from "@/components/forms/login/LoginForm";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen main-auth-div lg:flex">
      <div className="container lg:flex flex-grow">
        <div className="hidden px-3 py-20 lg:py-0 w-full lg:w-1/2 h-full lg:flex flex-col justify-center items-center lg:items-start">
          <div className="text-farmacieWhite space-y-4 my-auto xl:w-10/14">
            <h1 className="text-4xl !leading-tight lg:text-6xl text-center lg:text-left font-bold">
              Login to Farmacie Admin
            </h1>
            <p>Manage farmacie products, seeds, and companies</p>
          </div>
          <h1 className="text-farmacieWhite text-md !leading-tight text-center lg:text-left pb-10">
            POWERED BY{" "}
            <Link
              href="https://agronomics.pk/"
              target="_blank"
              className="font-bold"
            >
              AGRONOMICS
            </Link>
          </h1>
        </div>
        <div className="lg:px-3 w-full lg:w-1/2 flex items-center justify-center min-h-screen">
          <div className="space-y-8 bg-farmacieWhite rounded-xl">
            <div className="max-w-lg w-full mx-auto rounded-2xl px-4 py-1 sm:p-4 md:p-8 bg-farmacieWhite">
              <h2 className="font-bold text-xl text-neutral-800 pt-4">Login</h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2">
                Login yourself as <strong>(agronomic admin)</strong> by filling
                out the form below.
              </p>
              <LoginForm />
              <div className="flex items-center justify-center gap-3 pb-4 md:pb-0">
                <Link
                  href="/create-account"
                  className="text-center
                   underline text-primary"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
// import { AuthenticationContext } from "@/components/AuthContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  // const { setAuthState } = useContext(AuthenticationContext);

  async function onLoginSubmit() {
    try {
      let data = loginDetails;
      const response: any = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }).then((res) => res.json());
      // setAuthState(response);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <main className="flex min-h-screen p-4 flex-col items-center justify-between  sm:p-6 md:p-8 xs:p-4">
      <div className="w-full max-w-2xl p-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-black md:mt-10 dark:text-black">
        <div className="relative z-0 w-full mb-6 group flex justify-center">
          <div className="relative  overflow-hidden font-bold text-xl text-gray-900 ">
            Login
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={loginDetails.username}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 p-4 rounded"
            onClick={onLoginSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;

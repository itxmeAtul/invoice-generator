"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthenticationContext } from "@/components/AuthContext";
import AppRoutes from "./AppRoutes";
import LoginCard from "./LoginCard";

function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);

  if (loading)
    return <div className="flex px-4 py-4 bg-white text-white">Loading</div>;
  else if (!loading && data)
    return (
      <div className="flex min-h-screen p-4 flex-col items-center justify-between  sm:p-6 md:p-8 xs:p-4">
        <AppRoutes />
      </div>
    );
  else
    return (
      <div className="flex min-h-screen p-4 flex-col items-center justify-between  sm:p-6 md:p-8 xs:p-4">
        {/* <div className="flex px-4 py-4 text-white"> */}
          <LoginCard /> {/*  */}
        {/* </div> */}
      </div>
    );
}

export default NavBar;

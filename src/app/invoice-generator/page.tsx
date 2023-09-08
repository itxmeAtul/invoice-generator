import AppRoutes from "@/components/AppRoutes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

function InvoiceGenerator() {
  return <AppRoutes />;
}

export default InvoiceGenerator;

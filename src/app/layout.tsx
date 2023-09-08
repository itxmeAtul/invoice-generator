import AuthContext from "@/components/AuthContext";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RedClip events and entertainment",
  description: "A team which creates your moment in memories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthContext> */}
          {children}
          {/* </AuthContext> */}
        {/* {children} */}
      </body>
    </html>
  );
}

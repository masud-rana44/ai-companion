import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="fixed inset-y-0 mt-16 hidden h-full w-20 flex-col md:flex ">
        <Sidebar />
      </div>
      <main className="h-full pt-16 md:pl-20">{children}</main>
    </div>
  );
};

export default RootLayout;

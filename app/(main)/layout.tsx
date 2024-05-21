import React from "react";
import Navbar from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="py-10">{children}</div>
    </div>
  );
};

export default MainLayout;

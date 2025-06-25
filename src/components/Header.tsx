import Navbar from "@/components/Navbar";
import React from "react";

export default function Header(): React.ReactNode {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Navbar />
    </header>
  );
}

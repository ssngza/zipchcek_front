import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  mainClassName?: string;
  hideFooter?: boolean;
}

export default function Layout({
  children,
  fullWidth = false,
  mainClassName = "",
  hideFooter = false,
}: LayoutProps): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main fullWidth={fullWidth} className={mainClassName}>
        {children}
      </Main>
      {!hideFooter && <Footer />}
    </div>
  );
}

import { Container } from "@/components/ui/base";
import React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function Main({
  children,
  className = "",
  fullWidth = false,
}: MainProps): React.ReactNode {
  return (
    <main className={`flex-grow bg-background ${className}`}>
      {fullWidth ? (
        children
      ) : (
        <Container className="py-8">{children}</Container>
      )}
    </main>
  );
}

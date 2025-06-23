import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={cn("font-bold", className)}>{children}</Tag>;
};

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({ children, className }) => {
  return <p className={cn("text-base", className)}>{children}</p>;
};

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

interface FlexProps {
  children: ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: number;
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justify = "start",
  align = "start",
  gap = 0,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "column" ? "flex-col" : "flex-row",
        {
          "justify-start": justify === "start",
          "justify-end": justify === "end",
          "justify-center": justify === "center",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
          "justify-evenly": justify === "evenly",
        },
        {
          "items-start": align === "start",
          "items-end": align === "end",
          "items-center": align === "center",
          "items-baseline": align === "baseline",
          "items-stretch": align === "stretch",
        },
        { "gap-1": gap === 1 },
        { "gap-2": gap === 2 },
        { "gap-3": gap === 3 },
        { "gap-4": gap === 4 },
        { "gap-5": gap === 5 },
        { "gap-6": gap === 6 },
        className
      )}
    >
      {children}
    </div>
  );
};

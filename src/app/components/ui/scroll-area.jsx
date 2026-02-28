"use client";

import * from "react";
import * from "@radix-ui/react-scroll-area";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps) {
  return (
    
      
        {children}
      
      
      
    
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps) {
  return (
    
      
    
  );
}

export { ScrollArea, ScrollBar };

"use client";

import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "./utils";

function HoverCard(props) {
  return <HoverCardPrimitive.Root {...props} />;
}

function HoverCardTrigger(props) {
  return <HoverCardPrimitive.Trigger {...props} />;
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 rounded-md border bg-white p-4 shadow-md outline-none",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
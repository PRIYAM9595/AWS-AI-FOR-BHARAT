"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
  );
}

function Tooltip({
  ...props
}) {
  return (
    <TooltipPrimitive.Root {...props} />
  );
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn("bg-slate-900 text-white rounded px-2 py-1 text-sm", className)}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

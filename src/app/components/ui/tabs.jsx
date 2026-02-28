"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Root {...props} />
  );
}

function TabsList({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.List className={cn("", className)} {...props} />
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger className={cn("", className)} {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content className={cn("", className)} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

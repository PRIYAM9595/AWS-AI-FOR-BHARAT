"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "./utils";

function Drawer(props) {
  return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger(props) {
  return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal(props) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerClose(props) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/40",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-lg border bg-white p-4 shadow-lg",
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-gray-300" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      className={cn("grid gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
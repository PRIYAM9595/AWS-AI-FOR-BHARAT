"use client";

import React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function Menubar({ className, ...props }) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        "flex h-10 items-center space-x-1 rounded-md border bg-white p-1",
        className
      )}
      {...props}
    />
  );
}

function MenubarMenu(props) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup(props) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal(props) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup(props) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarTrigger({ className, ...props }) {
  return (
    <MenubarPrimitive.Trigger
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return (
    <MenubarPrimitive.Content
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] rounded-md border bg-white p-1 shadow-md",
        className
      )}
      {...props}
    />
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return (
    <MenubarPrimitive.Item
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <CheckIcon className="h-4 w-4" />
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}) {
  return (
    <MenubarPrimitive.RadioItem
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <CircleIcon className="h-2 w-2 fill-current" />
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({ className, inset, ...props }) {
  return (
    <MenubarPrimitive.Label
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  );
}

function MenubarSeparator({ className, ...props }) {
  return (
    <MenubarPrimitive.Separator
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

function MenubarShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-gray-500", className)}
      {...props}
    />
  );
}

function MenubarSub(props) {
  return <MenubarPrimitive.Sub {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return (
    <MenubarPrimitive.SubTrigger
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({ className, ...props }) {
  return (
    <MenubarPrimitive.SubContent
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
        className
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
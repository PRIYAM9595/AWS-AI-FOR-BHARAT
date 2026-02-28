"use client";

import * from "react";
import * from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function ContextMenu({
  ...props
}: React.ComponentProps) {
  return ;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps) {
  return ;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps & {
  inset?;
}) {
  return (
    
      {children}
      
    
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
      
    
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps & {
  inset?;
  variant?: "default" | "destructive";
}) {
  return (
    
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps) {
  return (
    
      
        
          
        
      
      {children}
    
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps) {
  return (
    
      
        
          
        
      
      {children}
    
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps & {
  inset?;
}) {
  return (
    
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

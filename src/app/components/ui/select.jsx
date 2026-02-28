"use client";

import * from "react";
import * from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "./utils";

function Select({
  ...props
}: React.ComponentProps) {
  return ;
}

function SelectGroup({
  ...props
}: React.ComponentProps) {
  return ;
}

function SelectValue({
  ...props
}: React.ComponentProps) {
  return ;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps & {
  size?: "sm" | "default";
}) {
  return (
    
      {children}
      
        
      
    
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps) {
  return (
    
      
        
        
          {children}
        
        
      
    
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps) {
  return (
    
      
        
          
        
      
      {children}
    
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
      
    
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
      
    
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

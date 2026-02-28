"use client";

import * from "react";
import { GripVerticalIcon } from "lucide-react";
import * from "react-resizable-panels";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps) {
  return (
    
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps) {
  return ;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps & {
  withHandle?;
}) {
  return (
    div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        
          
        
      )}
    
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

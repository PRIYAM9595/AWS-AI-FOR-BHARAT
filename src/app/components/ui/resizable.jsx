"use client";

import { GripVertical } from "lucide-react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}) {
  return (
    <PanelGroup className={className} {...props} />
  );
}

function ResizablePanel({
  ...props
}) {
  return <Panel {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return (
    <PanelResizeHandle
      className={cn(
        "bg-border w-px px-1 py-24 flex items-center justify-center relative select-none touch-none [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-1 rounded-full bg-border" />
      )}
    </PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

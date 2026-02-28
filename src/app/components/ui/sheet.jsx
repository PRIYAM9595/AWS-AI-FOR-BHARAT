"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "./utils";

function Sheet({ ...props }) {
  return <Dialog.Root {...props} />;
}

function SheetTrigger({
  ...props
}) {
  return <Dialog.Trigger {...props} />;
}

function SheetClose({
  ...props
}) {
  return <Dialog.Close {...props} />;
}

function SheetPortal({
  ...props
}) {
  return <Dialog.Portal {...props} />;
}

function SheetOverlay({
  className,
  ...props
}) {
  return (
    <Dialog.Overlay className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content className={cn("fixed z-50 gap-4 border bg-background p-4 shadow-lg", className)} {...props}>
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
  );
}

function SheetFooter({ className, ...props }) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
  );
}

function SheetTitle({
  className,
  ...props
}) {
  return (
    <Dialog.Title className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  );
}

function SheetDescription({
  className,
  ...props
}) {
  return (
    <Dialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

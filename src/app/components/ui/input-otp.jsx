"use client";

import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      className={cn("flex items-center gap-2", className)}
      containerClassName={cn("flex items-center gap-2", containerClassName)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } =
    inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border text-lg font-medium",
        isActive && "border-blue-500 ring-2 ring-blue-200",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-pulse bg-black" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }) {
  return (
    <div
      role="separator"
      className="flex items-center justify-center"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
"use client";

import * from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps & {
  containerClassName?;
}) {
  return (
    
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps) {
  return (
    
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps & {
  index;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    
      {char}
      {hasFakeCaret && (
        
          
        
      )}
    
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps) {
  return (
    
      
    
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

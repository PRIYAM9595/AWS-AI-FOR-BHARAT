"use client";

import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    
  );
};

export { Toaster };

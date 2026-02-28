import { cn } from "./utils";

function Textarea({ className, ...props }) {
  return (
    <textarea className={cn("border rounded px-3 py-2", className)} {...props} />
  );
}

export { Textarea };

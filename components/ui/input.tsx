
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-surface px-3 text-sm text-fg shadow-(--shadow-border) placeholder:text-subtle outline-none transition-shadow duration-150 focus-visible:shadow-[0_0_0_2px_var(--color-primary)]",
        className,
      )}
      {...props}
    />
  );
}
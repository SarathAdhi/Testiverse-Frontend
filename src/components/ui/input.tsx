import * as React from "react";

import { cn } from "@utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && <label htmlFor={name}>{label}</label>}

        <input
          {...props}
          name={name}
          id={name}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
        />

        {error && (
          <span
            role="alert"
            className="text-sm mt-2 text-red-600 font-semibold"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
